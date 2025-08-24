import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import { useCart } from "../components/CartProvider";
import { formatPrice } from "../lib/services";
import { getStripe } from "../lib/stripe";

export default function Checkout() {
  const router = useRouter();
  const { items, total, itemCount, isEmpty, updatePreferences, updateFiles } =
    useCart();
  const [selectedSocialPlatform, setSelectedSocialPlatform] =
    useState("Instagram");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const watchedFields = watch();

  // Redirect to order page if cart is empty
  useEffect(() => {
    if (isEmpty) {
      router.push("/order");
    }
  }, [isEmpty, router]);

  // Handle design preferences update
  const handlePreferencesUpdate = (itemId, preferences) => {
    updatePreferences(itemId, preferences);
  };

  // Handle file upload
  const handleFileUpload = async (itemId, sectionIndex, files) => {
    if (!files || files.length === 0) return;

    // Check file sizes (15MB limit)
    const maxSize = 15 * 1024 * 1024; // 15MB
    const oversizedFiles = Array.from(files).filter(
      (file) => file.size > maxSize
    );

    if (oversizedFiles.length > 0) {
      alert(
        `Some files are too large. Maximum file size is 15MB. Please resize or compress your files.`
      );
      return;
    }

    // Check if adding these files would exceed the 5-file limit per section
    const currentItem = items.find((item) => item.id === itemId);
    const currentFiles =
      currentItem?.uploadedFiles?.filter(
        (file) => file.sectionIndex === sectionIndex
      ) || [];
    const totalFilesAfterUpload = currentFiles.length + files.length;

    if (totalFilesAfterUpload > 5) {
      alert(
        `You can upload a maximum of 5 files per poster section. You currently have ${currentFiles.length} files and are trying to add ${files.length} more.`
      );
      return;
    }

    setUploadingFiles((prev) => ({
      ...prev,
      [`${itemId}-${sectionIndex}`]: true,
    }));

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/upload-files", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const { uploadedFiles } = await response.json();
      console.log("Upload response:", uploadedFiles);

      // Update cart with uploaded file URLs for specific section
      const currentItem = items.find((item) => item.id === itemId);
      const currentFiles = currentItem?.uploadedFiles || [];

      // Create section-specific files array
      const sectionFiles = currentFiles.filter(
        (file) => file.sectionIndex !== sectionIndex
      );
      const newFiles = [
        ...sectionFiles,
        ...uploadedFiles.map((file) => ({ ...file, sectionIndex })),
      ];

      console.log("Section files before:", sectionFiles);
      console.log("New files with section index:", newFiles);

      console.log(
        "Updated files for item:",
        itemId,
        "section:",
        sectionIndex,
        newFiles
      );

      updateFiles(itemId, newFiles);

      // Show success message
      setUploadSuccess((prev) => ({
        ...prev,
        [`${itemId}-${sectionIndex}`]: true,
      }));
      setTimeout(() => {
        setUploadSuccess((prev) => ({
          ...prev,
          [`${itemId}-${sectionIndex}`]: false,
        }));
      }, 3000);

      // Reset file input for this specific section
      const fileInput = document.getElementById(
        `file-upload-${itemId}-${sectionIndex}`
      );
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("File upload error:", error);
      alert("Failed to upload files. Please try again.");
    } finally {
      setUploadingFiles((prev) => ({
        ...prev,
        [`${itemId}-${sectionIndex}`]: false,
      }));
    }
  };

  // Handle file removal
  const handleRemoveFile = (itemId, sectionIndex, fileIndex) => {
    const currentItem = items.find((item) => item.id === itemId);
    if (!currentItem) return;

    const currentFiles = currentItem.uploadedFiles || [];
    const newFiles = currentFiles.filter((file, index) => {
      // Remove file if it matches both section and index
      if (file.sectionIndex === sectionIndex) {
        return index !== fileIndex;
      }
      return true;
    });

    updateFiles(itemId, newFiles);
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-primary/50", "bg-white/5");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary/50", "bg-white/5");
  };

  const handleDrop = (e, itemId, sectionIndex) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary/50", "bg-white/5");

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(itemId, sectionIndex, files);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Prepare customer info
      const customerInfo = {
        name: data.name,
        email: data.email,
        socialPlatform: selectedSocialPlatform,
        socialUsername: data.socialUsername || "Not provided",
      };

      // Create checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerInfo,
          cartItems: items,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe checkout error:", error);
        alert("Payment processing failed. Please try again.");
      }
    } catch (err) {
      console.error("Checkout submission error:", err);
      alert(
        "There was an error processing your checkout. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while redirecting
  if (isEmpty) {
    return (
      <>
        <Head>
          <title>Cart - Karate Designs CN</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon-64x64.png" />
        </Head>
        <Navbar />
        <main className="min-h-screen pt-24 pb-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-300">Redirecting to order page...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Complete Your Order - Karate Designs CN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon-64x64.png" />
      </Head>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Complete Your Order
            </h1>
            <p className="text-gray-300 text-lg">
              Provide your details and customize each item
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Customer Information */}
            <motion.div
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Contact Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: "Name is required" })}
                    className={`w-full px-4 py-4 bg-white/5 text-white border rounded-md
                      placeholder-transparent focus:outline-none focus:ring-2 peer
                      ${
                        errors.name
                          ? "border-red-500 ring-red-500"
                          : "border-white/10 focus:ring-primary"
                      }`}
                  />
                  <label
                    className={`absolute left-4 text-gray-400 text-sm transition-all pointer-events-none
                      ${
                        watchedFields.name
                          ? "top-1 text-xs text-primary"
                          : "top-4 text-base"
                      }`}
                  >
                    Full Name *
                  </label>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full px-4 py-4 bg-white/5 text-white border rounded-md
                      placeholder-transparent focus:outline-none focus:ring-2 peer
                      ${
                        errors.email
                          ? "border-red-500 ring-red-500"
                          : "border-white/10 focus:ring-primary"
                      }`}
                  />
                  <label
                    className={`absolute left-4 text-gray-400 text-sm transition-all pointer-events-none
                      ${
                        watchedFields.email
                          ? "top-1 text-xs text-primary"
                          : "top-4 text-base"
                      }`}
                  >
                    Email Address *
                  </label>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Social Media Section */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {/* Social Platform */}
                <div className="relative">
                  <select
                    value={selectedSocialPlatform}
                    onChange={(e) => setSelectedSocialPlatform(e.target.value)}
                    className="w-full px-4 py-4 bg-white/5 text-white border border-white/10 rounded-md
                      focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                  >
                    <option value="Instagram" className="bg-gray-800">
                      📷 Instagram
                    </option>
                    <option value="Facebook" className="bg-gray-800">
                      📘 Facebook
                    </option>
                  </select>
                  <label className="absolute -top-2 left-4 text-xs text-primary bg-charcoal px-1">
                    Social Platform *
                  </label>
                </div>

                {/* Social Username */}
                <div className="relative md:col-span-2">
                  <input
                    type="text"
                    placeholder={
                      selectedSocialPlatform === "Instagram"
                        ? "Instagram Username"
                        : "Facebook Name"
                    }
                    {...register("socialUsername", {
                      required: `${selectedSocialPlatform} ${
                        selectedSocialPlatform === "Instagram"
                          ? "username"
                          : "name"
                      } is required`,
                    })}
                    className={`w-full px-4 py-4 bg-white/5 text-white border rounded-md
                      placeholder-transparent focus:outline-none focus:ring-2 peer
                      ${
                        errors.socialUsername
                          ? "border-red-500 ring-red-500"
                          : "border-white/10 focus:ring-primary"
                      }`}
                  />
                  <label
                    className={`absolute left-4 text-gray-400 text-sm transition-all pointer-events-none
                      ${
                        watchedFields.socialUsername
                          ? "top-1 text-xs text-primary"
                          : "top-4 text-base"
                      }`}
                  >
                    {selectedSocialPlatform === "Instagram"
                      ? "Instagram Username"
                      : "Facebook Name"}{" "}
                    *
                  </label>
                  {errors.socialUsername && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.socialUsername.message}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    {selectedSocialPlatform === "Instagram"
                      ? "Enter your @username (without the @)"
                      : "Enter your full name as it appears on Facebook"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Design Preferences for Each Item */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {items.map((item) => {
                // Generate separate sections for each item when quantity > 1
                const sections = [];
                for (let i = 0; i < item.quantity; i++) {
                  const sectionNumber = i + 1;
                  const sectionId = `${item.id}_section_${i}`;
                  const sectionTitle =
                    item.quantity > 1
                      ? `${item.service.name} #${sectionNumber}`
                      : item.service.name;

                  sections.push(
                    <div
                      key={sectionId}
                      className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-8"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <h3 className="text-xl font-semibold text-white">
                            {sectionTitle}
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="text-primary font-bold text-lg">
                            {formatPrice(item.service.price)}
                          </span>
                        </div>
                      </div>

                      {/* Design Preferences */}
                      <div className="space-y-6">
                        {/* Color Selection */}
                        <div>
                          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                            <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                            Design Preferences (Optional)
                          </h2>

                          <div className="mb-6">
                            <label className="block text-white text-sm font-medium mb-4">
                              Preferred Color Scheme (Background & Accent
                              Colors)
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                              {[
                                {
                                  value: "red-black",
                                  name: "Red & Black",
                                  colors: ["#dc2626", "#000000"],
                                },
                                {
                                  value: "blue-white",
                                  name: "Blue & White",
                                  colors: ["#2563eb", "#ffffff"],
                                },
                                {
                                  value: "green-gold",
                                  name: "Green & Gold",
                                  colors: ["#059669", "#fbbf24"],
                                },
                                {
                                  value: "purple-silver",
                                  name: "Purple & Silver",
                                  colors: ["#7c3aed", "#9ca3af"],
                                },
                                {
                                  value: "orange-black",
                                  name: "Orange & Black",
                                  colors: ["#ea580c", "#000000"],
                                },
                                {
                                  value: "yellow-red",
                                  name: "Yellow & Red",
                                  colors: ["#eab308", "#dc2626"],
                                },
                                {
                                  value: "cyan-blue",
                                  name: "Cyan & Blue",
                                  colors: ["#0891b2", "#2563eb"],
                                },
                                {
                                  value: "pink-purple",
                                  name: "Pink & Purple",
                                  colors: ["#ec4899", "#7c3aed"],
                                },
                                {
                                  value: "custom",
                                  name: "Custom Colors",
                                  colors: ["#ffffff", "#000000"],
                                },
                              ].map((colorOption) => (
                                <motion.label
                                  key={colorOption.value}
                                  className={`relative cursor-pointer p-4 border rounded-lg transition-all
                                    ${
                                      item.designPreferences?.[
                                        `colorScheme_${i}`
                                      ] === colorOption.value
                                        ? "border-primary bg-primary/10"
                                        : "border-white/20 hover:border-white/40"
                                    }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <input
                                    type="radio"
                                    name={`colorScheme-${item.id}-${i}`}
                                    value={colorOption.value}
                                    checked={
                                      item.designPreferences?.[
                                        `colorScheme_${i}`
                                      ] === colorOption.value
                                    }
                                    onChange={(e) =>
                                      handlePreferencesUpdate(item.id, {
                                        [`colorScheme_${i}`]: e.target.value,
                                      })
                                    }
                                    className="sr-only"
                                  />
                                  <div className="flex items-center space-x-2 mb-2">
                                    {colorOption.colors.map((color, index) => (
                                      <div
                                        key={index}
                                        className="w-4 h-4 rounded-full border border-white/20"
                                        style={{ backgroundColor: color }}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-white">
                                    {colorOption.name}
                                  </span>
                                </motion.label>
                              ))}
                            </div>

                            {/* Custom Color Inputs */}
                            {item.designPreferences?.[`colorScheme_${i}`] ===
                              "custom" && (
                              <motion.div
                                className="mt-4 grid md:grid-cols-2 gap-4"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: 0.3 }}
                              >
                                <div>
                                  <label className="block text-white text-sm mb-2">
                                    Background Color
                                  </label>
                                  <div className="flex items-center space-x-3">
                                    <input
                                      type="color"
                                      value={
                                        item.designPreferences?.[
                                          `customColor1_${i}`
                                        ] || "#ffffff"
                                      }
                                      onChange={(e) =>
                                        handlePreferencesUpdate(item.id, {
                                          [`customColor1_${i}`]: e.target.value,
                                        })
                                      }
                                      className="w-12 h-12 rounded-md border border-white/20 cursor-pointer"
                                    />
                                    <input
                                      type="text"
                                      value={
                                        item.designPreferences?.[
                                          `customColor1_${i}`
                                        ] || "#ffffff"
                                      }
                                      onChange={(e) =>
                                        handlePreferencesUpdate(item.id, {
                                          [`customColor1_${i}`]: e.target.value,
                                        })
                                      }
                                      className="flex-1 px-3 py-2 bg-white/5 text-white border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-white text-sm mb-2">
                                    Accent Color
                                  </label>
                                  <div className="flex items-center space-x-3">
                                    <input
                                      type="color"
                                      value={
                                        item.designPreferences?.[
                                          `customColor2_${i}`
                                        ] || "#000000"
                                      }
                                      onChange={(e) =>
                                        handlePreferencesUpdate(item.id, {
                                          [`customColor2_${i}`]: e.target.value,
                                        })
                                      }
                                      className="w-12 h-12 rounded-md border border-white/20 cursor-pointer"
                                    />
                                    <input
                                      type="text"
                                      value={
                                        item.designPreferences?.[
                                          `customColor2_${i}`
                                        ] || "#000000"
                                      }
                                      onChange={(e) =>
                                        handlePreferencesUpdate(item.id, {
                                          [`customColor2_${i}`]: e.target.value,
                                        })
                                      }
                                      className="flex-1 px-3 py-2 bg-white/5 text-white border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        {/* File Upload Section */}
                        <div>
                          <label className="block text-white text-sm font-medium mb-3">
                            Reference Files & Inspiration (Optional)
                          </label>
                          <div className="space-y-4">
                            {/* Upload Area */}
                            <div
                              className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={(e) => handleDrop(e, item.id, i)}
                            >
                              <input
                                type="file"
                                multiple
                                accept="image/*,video/mp4"
                                onChange={(e) =>
                                  handleFileUpload(item.id, i, e.target.files)
                                }
                                className="hidden"
                                id={`file-upload-${item.id}-${i}`}
                                disabled={uploadingFiles[`${item.id}-${i}`]}
                              />
                              <label
                                htmlFor={`file-upload-${item.id}-${i}`}
                                className={`cursor-pointer block transition-all ${
                                  uploadingFiles[`${item.id}-${i}`]
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                              >
                                {uploadingFiles[`${item.id}-${i}`] ? (
                                  <div className="space-y-3">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                    <p className="text-gray-300">
                                      Uploading files...
                                    </p>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                      <div
                                        className="bg-primary h-2 rounded-full animate-pulse"
                                        style={{ width: "60%" }}
                                      ></div>
                                    </div>
                                  </div>
                                ) : uploadSuccess[`${item.id}-${i}`] ||
                                  (item.uploadedFiles &&
                                    item.uploadedFiles.filter(
                                      (file) => file.sectionIndex === i
                                    ).length > 0) ? (
                                  <div className="space-y-3">
                                    <svg
                                      className="w-8 h-8 text-green-400 mx-auto"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                    <div>
                                      <p className="text-green-400 font-medium">
                                        {uploadSuccess[`${item.id}-${i}`]
                                          ? "Files uploaded successfully!"
                                          : `${
                                              item.uploadedFiles.filter(
                                                (file) =>
                                                  file.sectionIndex === i
                                              ).length
                                            } file${
                                              item.uploadedFiles.filter(
                                                (file) =>
                                                  file.sectionIndex === i
                                              ).length > 1
                                                ? "s"
                                                : ""
                                            } uploaded`}
                                      </p>
                                      <p className="text-gray-400 text-sm mt-1">
                                        {uploadSuccess[`${item.id}-${i}`]
                                          ? "Your files are ready for this order"
                                          : "Click to add more files or drag and drop"}
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-3">
                                    <svg
                                      className="w-8 h-8 text-gray-400 mx-auto"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                      />
                                    </svg>
                                    <div>
                                      <p className="text-white font-medium">
                                        Click to upload or drag and drop
                                      </p>
                                      <p className="text-gray-400 text-sm mt-1">
                                        Images (JPG, PNG, GIF) and MP4 videos up
                                        to 15MB each (max 5 files per section)
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </label>
                            </div>

                            {/* Uploaded Files List */}
                            {(() => {
                              const sectionFiles =
                                item.uploadedFiles?.filter(
                                  (file) => file.sectionIndex === i
                                ) || [];
                              return sectionFiles.length > 0 ? (
                                <div className="space-y-2">
                                  <p className="text-gray-300 text-sm font-medium">
                                    Uploaded Files ({sectionFiles.length}):
                                  </p>
                                  <div className="space-y-2">
                                    {sectionFiles.map((file, fileIndex) => (
                                      <div
                                        key={fileIndex}
                                        className="flex items-center justify-between bg-white/5 border border-white/10 rounded-md p-3"
                                      >
                                        <div className="flex items-center space-x-3">
                                          {file.type?.startsWith("image/") ? (
                                            <svg
                                              className="w-5 h-5 text-blue-400"
                                              fill="currentColor"
                                              viewBox="0 0 20 20"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          ) : (
                                            <svg
                                              className="w-5 h-5 text-red-400"
                                              fill="currentColor"
                                              viewBox="0 0 20 20"
                                            >
                                              <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                            </svg>
                                          )}
                                          <div className="min-w-0 flex-1">
                                            <p className="text-white text-sm truncate">
                                              {file.name ||
                                                `File ${fileIndex + 1}`}
                                            </p>
                                            <p className="text-gray-400 text-xs">
                                              {file.size
                                                ? `${(
                                                    file.size /
                                                    1024 /
                                                    1024
                                                  ).toFixed(1)} MB`
                                                : "Unknown size"}
                                            </p>
                                          </div>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleRemoveFile(
                                              item.id,
                                              i,
                                              fileIndex
                                            )
                                          }
                                          className="text-red-400 hover:text-red-300 transition-colors p-1"
                                        >
                                          <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : null;
                            })()}
                          </div>
                        </div>

                        {/* Additional Comments Section */}
                        <div>
                          <label className="block text-white text-sm font-medium mb-3">
                            Additional Comments, Ideas, or Special Requirements
                          </label>
                          <textarea
                            rows={4}
                            placeholder="Share your vision, specific requirements, text content, or any reference materials you'd like us to consider..."
                            value={
                              item.designPreferences?.[`comments_${i}`] || ""
                            }
                            onChange={(e) =>
                              handlePreferencesUpdate(item.id, {
                                [`comments_${i}`]: e.target.value,
                              })
                            }
                            className="w-full px-4 py-4 bg-white/5 text-white border border-white/10 rounded-md
                              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }

                return sections;
              })}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({itemCount} items):</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Revisions (included):</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Delivery:</span>
                  <span className="text-green-400">3-7 days</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-white font-bold text-xl">
                    <span>Total:</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full bg-primary text-white px-8 py-4 rounded-md font-semibold text-lg transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center space-x-3
                  ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-primary/90"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <span>Proceed to Payment</span>
                  </>
                )}
              </motion.button>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    2 Free Revisions
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    High-Resolution Files
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Secure Payment
                  </span>
                </div>
              </div>
            </motion.div>
          </form>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
