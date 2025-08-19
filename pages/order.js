import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Head from "next/head";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import { getStripe } from "../lib/stripe";

// Service options with pricing
const serviceOptions = [
  {
    category: "Poster Design",
    services: [
      {
        id: "tournament-poster",
        name: "Tournament Poster",
        price: 90,
        description: "Bold posters tailored for major tournaments",
      },
      {
        id: "team-poster",
        name: "Team Poster",
        price: 70,
        description: "Showcase your team with dynamic poster layouts",
      },
      {
        id: "seminar-poster",
        name: "Seminar Poster",
        price: 80,
        description: "Professional posters for seminars and workshops",
      },
      {
        id: "athlete-poster",
        name: "Athlete Highlight Poster",
        price: 70,
        description: "Spotlight athletes with striking visual flair",
      },
      {
        id: "training-camp-poster",
        name: "Training Camp Poster",
        price: 80,
        description: "Promote camps with clear, branded visuals",
      },
      {
        id: "custom-poster",
        name: "Custom Poster Design",
        price: 45,
        description: "Fully customized poster for any purpose",
      },
    ],
  },
  {
    category: "Banner Design",
    services: [
      {
        id: "event-banner",
        name: "Event Banner",
        price: 130,
        description: "Large-format banners for any setting",
      },
      {
        id: "dojo-banner",
        name: "Dojo Banner",
        price: 120,
        description: "Represent your dojo with pride and clarity",
      },
      {
        id: "competition-banner",
        name: "Competition Banner",
        price: 120,
        description: "Eye-catching banners for competitive events",
      },
      {
        id: "rollup-banner",
        name: "Roll-Up Banner",
        price: 110,
        description: "Portable banners ideal for quick setup",
      },
      {
        id: "social-media-banner",
        name: "Social Media Banner (FB/Twitter/YouTube)",
        price: 60,
        description: "Banners optimized for social media platforms",
      },
    ],
  },
  {
    category: "Logo Design",
    services: [
      {
        id: "dojo-logo",
        name: "Karate Dojo Logo",
        price: 140,
        description: "Unique dojo branding that commands respect",
      },
      {
        id: "tournament-logo",
        name: "Tournament Logo",
        price: 140,
        description: "Icons that symbolize competition and excellence",
      },
      {
        id: "athlete-logo",
        name: "Personal Brand Logo",
        price: 120,
        description: "Logos that capture your personal ethos",
      },
      {
        id: "mascot-logo",
        name: "Mascot Logo for Teams",
        price: 160,
        description: "Fun and fierce mascot designs for teams",
      },
      {
        id: "minimal-logo",
        name: "Minimal/Modern Logo (general use)",
        price: 110,
        description: "Clean, modern logos for general use",
      },
    ],
  },
  {
    category: "Social Media Graphics",
    services: [
      {
        id: "instagram-post-pack",
        name: "Instagram Post Pack (5 posts)",
        price: 70,
        description: "Set of 5 styled Instagram posts",
      },
      {
        id: "instagram-story-pack",
        name: "Instagram Story Pack (5 stories)",
        price: 60,
        description: "Set of 5 Instagram story templates",
      },
      {
        id: "social-media-ad",
        name: "Facebook/Instagram Ad Design",
        price: 40,
        description: "Optimized ad designs for social media",
      },
      {
        id: "athlete-social-pack",
        name: "Athlete/Dojo Social Pack (10 posts + 5 stories)",
        price: 120,
        description: "Complete social media package for athletes and dojos",
      },
    ],
  },
  {
    category: "Merch & Apparel Design",
    services: [
      {
        id: "tshirt-design",
        name: "T-Shirt Design",
        price: 60,
        description: "Stylish graphics for martial arts t-shirts",
      },
      {
        id: "hoodie-design",
        name: "Hoodie Design",
        price: 70,
        description: "Comfy and bold designs for hoodies",
      },
      {
        id: "gi-patch",
        name: "Gi Patch / Dojo Patch",
        price: 50,
        description: "Patches for uniforms and dojo branding",
      },
      {
        id: "merchandise-pack",
        name: "Merchandise Pack (T-shirt + Hoodie + Patch)",
        price: 150,
        description: "Complete merchandise design package",
      },
    ],
  },
  {
    category: "Event & Dojo Materials",
    services: [
      {
        id: "certificate-design",
        name: "Certificate Design (Belt / Participation / Achievement)",
        price: 50,
        description: "Professional certificates for achievements",
      },
      {
        id: "medal-design",
        name: "Medal/Ribbon Design",
        price: 60,
        description: "Designs for competition medals and ribbons",
      },
      {
        id: "ticket-design",
        name: "Ticket/Pass Design",
        price: 40,
        description: "Event tickets and passes",
      },
      {
        id: "business-card",
        name: "Business Card Design",
        price: 40,
        description: "Professional business cards",
      },
      {
        id: "flyer-single",
        name: "Flyer/Leaflet (single side)",
        price: 50,
        description: "Single-sided promotional flyers",
      },
      {
        id: "flyer-double",
        name: "Flyer/Leaflet (double side)",
        price: 70,
        description: "Double-sided promotional flyers",
      },
    ],
  },
  {
    category: "Digital & Video Graphics",
    services: [
      {
        id: "motion-poster",
        name: "Motion Poster / Animated Social Ad",
        price: 90,
        description: "Animated posters and social media ads",
      },
      {
        id: "video-intro",
        name: "Video Intro/Outro",
        price: 120,
        description: "Professional video intro and outro graphics",
      },
      {
        id: "tournament-promo-video",
        name: "Tournament Promo Video (short edit)",
        price: 150,
        description: "Short promotional videos for tournaments",
      },
    ],
  },
  {
    category: "Package Deals",
    services: [
      {
        id: "event-branding-package",
        name: "Event Branding Package",
        price: 220,
        description: "Complete branding package for events",
      },
      {
        id: "dojo-starter-pack",
        name: "Dojo Starter Pack",
        price: 300,
        description: "Complete starter package for new dojos",
      },
      {
        id: "athlete-highlight-pack",
        name: "Athlete Highlight Pack",
        price: 150,
        description: "Package for athlete self-branding",
      },
      {
        id: "tournament-promo-pack",
        name: "Tournament Promo Pack",
        price: 350,
        description: "Complete tournament promotion package",
      },
      {
        id: "social-media-growth-pack",
        name: "Social Media Growth Pack",
        price: 200,
        description: "Comprehensive social media package",
      },
      {
        id: "complete-dojo-identity-pack",
        name: "Complete Dojo Identity Pack",
        price: 500,
        description: "Full dojo identity and branding package",
      },
    ],
  },
];

// Color options for poster design
const colorOptions = [
  { name: "Red & Black", value: "red-black", colors: ["#e63946", "#000000"] },
  { name: "Gold & Black", value: "gold-black", colors: ["#bfa76f", "#000000"] },
  { name: "Blue & White", value: "blue-white", colors: ["#264653", "#ffffff"] },
  { name: "Green & Gold", value: "green-gold", colors: ["#2a9d8f", "#bfa76f"] },
  {
    name: "Purple & Silver",
    value: "purple-silver",
    colors: ["#6f42c1", "#adb5bd"],
  },
  {
    name: "Orange & Black",
    value: "orange-black",
    colors: ["#f77f00", "#000000"],
  },
  { name: "Custom Colors", value: "custom", colors: ["#e63946", "#bfa76f"] },
];

export default function Order() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const [selectedService, setSelectedService] = useState("custom-poster");
  const [selectedColors, setSelectedColors] = useState("");
  const [customColor1, setCustomColor1] = useState("#e63946");
  const [customColor2, setCustomColor2] = useState("#bfa76f");
  const [selectedSocialPlatform, setSelectedSocialPlatform] =
    useState("Instagram");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Watch form values for dynamic labels
  const watchedFields = watch();

  // Get selected service details
  const getSelectedServiceDetails = () => {
    for (const category of serviceOptions) {
      const service = category.services.find((s) => s.id === selectedService);
      if (service) return service;
    }
    return serviceOptions[0].services[0]; // Default fallback
  };

  const selectedServiceDetails = getSelectedServiceDetails();

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxFiles = 10;
    const maxSize = 20 * 1024 * 1024; // 20MB per file

    // Validate file count
    if (files.length > maxFiles) {
      alert(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }

    // Validate file sizes and types
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= maxSize;

      if (!isValidType) {
        alert(`${file.name} is not a valid image file.`);
        return false;
      }

      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum size is 20MB.`);
        return false;
      }

      return true;
    });

    setUploadedFiles(validFiles);
  };

  // Remove uploaded file
  const removeFile = (index) => {
    setUploadedFiles((files) => files.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      let uploadedFileUrls = [];

      // Upload files first if any are selected
      if (uploadedFiles.length > 0) {
        setIsUploading(true);

        const formData = new FormData();

        // Add files to form data
        uploadedFiles.forEach((file) => {
          formData.append("files", file);
        });

        // Add metadata
        const orderId = `order_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        formData.append("customerName", data.name);
        formData.append("orderId", orderId);

        try {
          // Upload files
          const uploadResponse = await fetch("/api/upload-files", {
            method: "POST",
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload reference images");
          }

          const uploadResult = await uploadResponse.json();
          uploadedFileUrls = uploadResult.uploaded || [];

          if (uploadResult.totalFailed > 0) {
            console.warn("Some files failed to upload:", uploadResult.failed);
            alert(
              `Warning: ${uploadResult.totalFailed} files failed to upload. Proceeding with ${uploadResult.totalUploaded} successful uploads.`
            );
          }
        } finally {
          setIsUploading(false);
        }
      }

      // Prepare the order data
      const orderData = {
        name: data.name,
        email: data.email,
        socialPlatform: selectedSocialPlatform,
        socialUsername: data.socialUsername || "Not provided",
        serviceType: selectedService,
        selectedColors:
          selectedColors === "custom"
            ? `Custom: ${customColor1} & ${customColor2}`
            : colorOptions.find((c) => c.value === selectedColors)?.name ||
              "Not selected",
        comments: data.comments || "No additional comments",
        uploadedFilesCount: uploadedFileUrls.length,
        uploadedFileUrls: uploadedFileUrls,
        uploadedFilesInfo: uploadedFileUrls.map((fileData) => ({
          name: fileData.originalName,
          url: fileData.url,
          size: fileData.size,
          type: fileData.type,
        })),
      };

      // Create Stripe checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
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
      console.error("Order submission error:", err);
      alert(
        "There was an error processing your order. Please try again or contact us directly."
      );
    }
  };

  return (
    <>
      <Head>
        <title>Order Now - Karate Designs CN</title>
        <meta
          name="description"
          content="Place your custom poster design order with Karate Designs CN. Professional martial arts and creative design services."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon-64x64.png" />
      </Head>

      <Navbar />

      <main className="min-h-screen pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Order Your Custom Design
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Ready to bring your vision to life? Select your service, provide
              your details, and complete your order with secure payment.
            </p>
          </motion.div>

          {/* Order Form */}
          <motion.div
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Service Selection */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Select Your Service
                </h2>

                <div className="space-y-4">
                  {serviceOptions.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h3 className="text-lg font-medium text-gold mb-3">
                        {category.category}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3 mb-6">
                        {category.services.map((service) => (
                          <motion.label
                            key={service.id}
                            className={`relative cursor-pointer p-4 border rounded-lg transition-all
                              ${
                                selectedService === service.id
                                  ? "border-primary bg-primary/10"
                                  : "border-white/20 hover:border-white/40"
                              }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={service.id}
                              checked={selectedService === service.id}
                              onChange={(e) =>
                                setSelectedService(e.target.value)
                              }
                              className="sr-only"
                            />
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-white font-medium">
                                {service.name}
                              </h4>
                              <span className="text-primary font-bold text-lg">
                                €{service.price}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm">
                              {service.description}
                            </p>
                          </motion.label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Service Summary */}
                <div className="bg-white/5 border border-primary/30 rounded-lg p-4 mt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-medium">
                        {selectedServiceDetails.name}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {selectedServiceDetails.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">
                        €{selectedServiceDetails.price}
                      </span>
                      <p className="text-gray-400 text-xs">
                        includes 2 free revisions
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Required Fields Section */}
              <div>
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
                      onChange={(e) =>
                        setSelectedSocialPlatform(e.target.value)
                      }
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
              </div>

              {/* Design Preferences Section */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                  Design Preferences (Optional)
                </h2>

                {/* Color Selection */}
                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-4">
                    Preferred Color Scheme (Background & Accent Colors)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {colorOptions.map((colorOption) => (
                      <motion.label
                        key={colorOption.value}
                        className={`relative cursor-pointer p-4 border rounded-lg transition-all
                          ${
                            selectedColors === colorOption.value
                              ? "border-primary bg-primary/10"
                              : "border-white/20 hover:border-white/40"
                          }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="colorScheme"
                          value={colorOption.value}
                          checked={selectedColors === colorOption.value}
                          onChange={(e) => setSelectedColors(e.target.value)}
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
                  {selectedColors === "custom" && (
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
                            value={customColor1}
                            onChange={(e) => setCustomColor1(e.target.value)}
                            className="w-12 h-12 rounded-md border border-white/20 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={customColor1}
                            onChange={(e) => setCustomColor1(e.target.value)}
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
                            value={customColor2}
                            onChange={(e) => setCustomColor2(e.target.value)}
                            className="w-12 h-12 rounded-md border border-white/20 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={customColor2}
                            onChange={(e) => setCustomColor2(e.target.value)}
                            className="flex-1 px-3 py-2 bg-white/5 text-white border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* File Upload Section */}
                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-4">
                    Reference Images (Optional)
                  </label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <svg
                        className="w-12 h-12 text-gray-400 mb-4"
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
                      <p className="text-white mb-2">
                        Click to upload reference images
                      </p>
                      <p className="text-gray-400 text-sm">
                        PNG, JPG, GIF up to 20MB each (max 10 files)
                      </p>
                    </label>
                  </div>

                  {/* Uploaded Files Display */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-white text-sm font-medium mb-3">
                        Uploaded Files ({uploadedFiles.length}/10):
                      </h4>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10"
                          >
                            <div className="flex items-center space-x-3">
                              <svg
                                className="w-5 h-5 text-primary"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <div>
                                <p className="text-white text-sm font-medium">
                                  {file.name}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
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
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-gray-400 text-xs mt-2">
                    Upload images that inspire your design or reference
                    materials you&apos;d like us to consider.
                  </p>
                </div>

                {/* Comments/Ideas Field */}
                <div className="relative">
                  <textarea
                    rows={5}
                    placeholder="Comments and Ideas"
                    {...register("comments")}
                    className="w-full px-4 py-4 bg-white/5 text-white border border-white/10 rounded-md
                      placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  <label
                    className={`absolute left-4 text-gray-400 text-sm transition-all pointer-events-none
                      ${
                        watchedFields.comments
                          ? "top-1 text-xs text-primary"
                          : "top-4 text-base"
                      }`}
                  >
                    Additional Comments, Ideas, or Special Requirements
                  </label>
                  <p className="text-gray-400 text-xs mt-2">
                    Share your vision, specific requirements, text content, or
                    any reference materials you&apos;d like us to consider.
                  </p>
                </div>
              </div>

              {/* Payment Section */}
              <div className="border-t border-white/10 pt-8">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Secure Payment
                </h2>

                <div className="bg-gradient-to-r from-primary/10 to-gold/10 border border-primary/20 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        Order Summary
                      </h3>
                      <p className="text-gray-300">
                        {selectedServiceDetails.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-primary">
                        €{selectedServiceDetails.price}
                      </span>
                      <p className="text-gray-400 text-sm">
                        Secure payment via Stripe
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
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
                      3-7 Day Delivery
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
                  </div>
                </div>

                {/* Submit/Payment Button */}
                <motion.div className="text-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    whileHover={{
                      scale: isSubmitting || isUploading ? 1 : 1.05,
                    }}
                    whileTap={{ scale: isSubmitting || isUploading ? 1 : 0.95 }}
                    className={`bg-gradient-to-r from-primary to-primary/80 text-white px-12 py-4 rounded-md font-semibold text-lg tracking-wide transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center mx-auto space-x-3
                      ${
                        isSubmitting || isUploading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:from-primary/90 hover:to-primary/70"
                      }`}
                  >
                    {isUploading ? (
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
                        Uploading Images...
                      </>
                    ) : isSubmitting ? (
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
                        <span>
                          Pay €{selectedServiceDetails.price} - Proceed to
                          Checkout
                        </span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-gray-400 text-xs mt-4 flex items-center justify-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Secure payment powered by Stripe • Your card details are
                      never stored
                    </span>
                  </p>
                </motion.div>
              </div>
            </form>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-12 text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="mb-4">
              Questions about our process or need a custom quote?
              <a
                href="#contact"
                className="text-primary hover:text-primary/80 ml-1"
              >
                Contact us directly
              </a>
            </p>
            <p className="text-sm">
              All payments are processed securely through Stripe • We accept all
              major credit cards
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
