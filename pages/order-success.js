import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../components/CartProvider";
import { getServiceById } from "../lib/services";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

export default function OrderSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const { clearCartAfterPayment } = useCart();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session_id) {
      // Fetch session details from Stripe
      fetch(`/api/checkout-session?session_id=${session_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setSessionData(data);

            // Send email notification now that payment is confirmed
            if (data.payment_status === "paid" && data.metadata) {
              console.log("Stripe metadata:", data.metadata);

              // Parse cart items from metadata
              const cartItems = [];
              const totalItems = parseInt(data.metadata.totalItems) || 0;

              for (let i = 0; i < totalItems; i++) {
                const prefix = `item_${i}`;
                const serviceId = data.metadata[`${prefix}_serviceId`];
                const service = getServiceById(serviceId);

                const item = {
                  serviceId: serviceId,
                  serviceName: service?.name || "Unknown Service",
                  quantity: parseInt(data.metadata[`${prefix}_quantity`]) || 1,
                  designPreferences: {},
                  uploadedFiles: [],
                };

                // Parse design preferences for each section (when quantity > 1)
                for (
                  let sectionIndex = 0;
                  sectionIndex < item.quantity;
                  sectionIndex++
                ) {
                  const sectionPrefix = `${prefix}_section_${sectionIndex}`;
                  item.designPreferences[`colorScheme_${sectionIndex}`] =
                    data.metadata[`${sectionPrefix}_colorScheme`] || "";
                  item.designPreferences[`customColor1_${sectionIndex}`] =
                    data.metadata[`${sectionPrefix}_customColor1`] || "";
                  item.designPreferences[`customColor2_${sectionIndex}`] =
                    data.metadata[`${sectionPrefix}_customColor2`] || "";
                  item.designPreferences[`comments_${sectionIndex}`] =
                    data.metadata[`${sectionPrefix}_comments`] || "";
                }

                // Parse uploaded files for this item
                const filesCount =
                  parseInt(data.metadata[`${prefix}_filesCount`]) || 0;
                for (let f = 0; f < filesCount; f++) {
                  const fileData = data.metadata[`${prefix}_file${f}`];

                  if (fileData) {
                    try {
                      const fileInfo = JSON.parse(fileData);
                      item.uploadedFiles.push({
                        url: fileInfo.url,
                        name: fileInfo.name,
                        type: fileInfo.type,
                        sectionIndex: parseInt(fileInfo.sectionIndex) || 0,
                      });
                    } catch (error) {
                      console.error("Error parsing file metadata:", error);
                    }
                  }
                }

                cartItems.push(item);
              }

              const emailData = {
                orderData: {
                  customerName: data.metadata.customerName,
                  customerEmail: data.customer_email,
                  socialPlatform: data.metadata.socialPlatform,
                  socialUsername: data.metadata.socialUsername,
                  totalItems: totalItems,
                  totalAmount: data.metadata.totalAmount,
                  cartItems: cartItems,
                },
                sessionId: data.id,
              };

              // Send notification emails
              Promise.all([
                fetch("/api/send-order-notification", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(emailData),
                }),
                fetch("/api/send-customer-confirmation", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(emailData),
                }),
              ]).catch((emailError) => {
                console.error("Email sending failed:", emailError);
              });
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch session:", err);
          setError(
            "We encountered an issue verifying your payment. Please contact us directly with your order details."
          );
          setLoading(false);
        });
    }
  }, [session_id]);

  // Clear cart when payment is successful
  useEffect(() => {
    if (sessionData && sessionData.payment_status === "paid") {
      clearCartAfterPayment();
    }
  }, [sessionData, clearCartAfterPayment]);

  return (
    <>
      <Head>
        <title>Order Confirmation - Karate Designs CN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon-64x64.png" />
      </Head>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-300">Verifying your payment...</p>
            </div>
          ) : error ? (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">
                Payment Verification Failed
              </h1>
              <p className="text-gray-300 mb-8">{error}</p>
              <Link
                href="/order"
                className="bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-primary/90 transition-all"
              >
                Try Again
              </Link>
            </motion.div>
          ) : sessionData &&
            (sessionData.payment_status === "paid" ||
              sessionData.payment_status === "unpaid") ? (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
              </motion.div>

              {/* Success Message */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                {sessionData.payment_status === "paid"
                  ? "Payment Successful! 🎉"
                  : "Order Received! 🎉"}
              </h1>
              <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 px-4 sm:px-0">
                {sessionData.payment_status === "paid"
                  ? "Thank you for your order! We've received your payment and will start working on your design right away."
                  : "Thank you for your order! This appears to be a test session. In production, your payment would be processed and we would start working on your design."}
              </p>

              {/* Order Details */}
              <motion.div
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 lg:p-8 text-left mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 text-center">
                  Order Details
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-gray-300 text-sm sm:text-base mb-1 sm:mb-0">
                      Order ID:
                    </span>
                    <span className="text-white font-mono text-xs sm:text-sm break-all">
                      {sessionData.id}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-gray-300 text-sm sm:text-base mb-1 sm:mb-0">
                      Customer:
                    </span>
                    <span className="text-white text-sm sm:text-base break-words">
                      {sessionData.metadata?.customerName || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-gray-300 text-sm sm:text-base mb-1 sm:mb-0">
                      Email:
                    </span>
                    <span className="text-white text-sm sm:text-base break-all">
                      {sessionData.customer_email || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-gray-300 text-sm sm:text-base mb-1 sm:mb-0">
                      Social Media:
                    </span>
                    <span className="text-white text-sm sm:text-base break-words">
                      {sessionData.metadata?.socialPlatform || "N/A"} -{" "}
                      {sessionData.metadata?.socialUsername || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-gray-300 text-sm sm:text-base mb-1 sm:mb-0">
                      Total Items:
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      {sessionData.metadata?.totalItems || 1}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-gray-300 text-sm sm:text-base mb-1 sm:mb-0">
                      Total Amount:
                    </span>
                    <span className="text-white font-bold text-base sm:text-lg">
                      €{((sessionData.amount_total || 0) / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-gray-300 text-sm sm:text-base mb-1 sm:mb-0">
                      Payment Status:
                    </span>
                    <span
                      className={`font-semibold text-sm sm:text-base ${
                        sessionData.payment_status === "paid"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {sessionData.payment_status === "paid"
                        ? "Paid"
                        : "Test Session"}
                    </span>
                  </div>
                </div>

                {/* Cart Items */}
                {(() => {
                  const cartItems = [];
                  const totalItems =
                    parseInt(sessionData.metadata?.totalItems) || 0;

                  for (let i = 0; i < totalItems; i++) {
                    const prefix = `item_${i}`;
                    const serviceId =
                      sessionData.metadata[`${prefix}_serviceId`];
                    const service = getServiceById(serviceId);
                    const quantity =
                      parseInt(sessionData.metadata[`${prefix}_quantity`]) || 1;
                    const filesCount =
                      parseInt(sessionData.metadata[`${prefix}_filesCount`]) ||
                      0;

                    if (serviceId) {
                      // Parse design preferences for each section
                      const designPreferences = {};
                      for (
                        let sectionIndex = 0;
                        sectionIndex < quantity;
                        sectionIndex++
                      ) {
                        const sectionPrefix = `${prefix}_section_${sectionIndex}`;

                        designPreferences[`colorScheme_${sectionIndex}`] =
                          sessionData.metadata[
                            `${sectionPrefix}_colorScheme`
                          ] || "";
                        designPreferences[`customColor1_${sectionIndex}`] =
                          sessionData.metadata[
                            `${sectionPrefix}_customColor1`
                          ] || "";
                        designPreferences[`customColor2_${sectionIndex}`] =
                          sessionData.metadata[
                            `${sectionPrefix}_customColor2`
                          ] || "";
                        designPreferences[`comments_${sectionIndex}`] =
                          sessionData.metadata[`${sectionPrefix}_comments`] ||
                          "";
                        designPreferences[`fontStyle_${sectionIndex}`] =
                          sessionData.metadata[`${sectionPrefix}_fontStyle`] ||
                          "";
                        designPreferences[`textContent_${sectionIndex}`] =
                          sessionData.metadata[
                            `${sectionPrefix}_textContent`
                          ] || "";
                        designPreferences[
                          `specialRequirements_${sectionIndex}`
                        ] =
                          sessionData.metadata[
                            `${sectionPrefix}_specialRequirements`
                          ] || "";
                      }

                      cartItems.push({
                        serviceId,
                        serviceName: service?.name || "Unknown Service",
                        quantity,
                        filesCount,
                        designPreferences,
                      });
                    }
                  }

                  return cartItems.length > 0 ? (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-3">
                        Order Items:
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        {cartItems.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4"
                          >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2 sm:gap-0">
                              <span className="text-white font-medium text-sm sm:text-base">
                                {item.serviceName}
                              </span>
                              <span className="text-primary font-bold text-sm sm:text-base">
                                Qty: {item.quantity}
                              </span>
                            </div>

                            {/* Display sections for each item */}
                            {Array.from(
                              { length: item.quantity },
                              (_, sectionIndex) => {
                                const sectionNumber = sectionIndex + 1;
                                const sectionTitle =
                                  item.quantity > 1
                                    ? `${item.serviceId
                                        .replace(/-/g, " ")
                                        .replace(/\b\w/g, (l) =>
                                          l.toUpperCase()
                                        )} #${sectionNumber}`
                                    : item.serviceId
                                        .replace(/-/g, " ")
                                        .replace(/\b\w/g, (l) =>
                                          l.toUpperCase()
                                        );

                                return (
                                  <div
                                    key={sectionIndex}
                                    className="mb-3 p-2 sm:p-3 bg-white/5 rounded border border-white/5"
                                  >
                                    <h4 className="text-white font-medium mb-2 text-sm sm:text-base">
                                      {sectionTitle}
                                    </h4>
                                    {item.designPreferences[
                                      `colorScheme_${sectionIndex}`
                                    ] && (
                                      <p className="text-gray-300 text-xs sm:text-sm mb-1 break-words">
                                        <span className="font-medium">
                                          Color Scheme:
                                        </span>{" "}
                                        {
                                          item.designPreferences[
                                            `colorScheme_${sectionIndex}`
                                          ]
                                        }
                                      </p>
                                    )}
                                    {item.designPreferences[
                                      `colorScheme_${sectionIndex}`
                                    ] === "custom" &&
                                      item.designPreferences[
                                        `customColor1_${sectionIndex}`
                                      ] && (
                                        <p className="text-gray-300 text-xs sm:text-sm mb-1 break-words">
                                          <span className="font-medium">
                                            Custom Colors:
                                          </span>{" "}
                                          Background:{" "}
                                          {
                                            item.designPreferences[
                                              `customColor1_${sectionIndex}`
                                            ]
                                          }
                                          , Accent:{" "}
                                          {item.designPreferences[
                                            `customColor2_${sectionIndex}`
                                          ] || "Not specified"}
                                        </p>
                                      )}
                                    {item.designPreferences[
                                      `comments_${sectionIndex}`
                                    ] && (
                                      <p className="text-gray-300 text-xs sm:text-sm mb-1 break-words">
                                        <span className="font-medium">
                                          Additional Comments:
                                        </span>{" "}
                                        {
                                          item.designPreferences[
                                            `comments_${sectionIndex}`
                                          ]
                                        }
                                      </p>
                                    )}
                                  </div>
                                );
                              }
                            )}
                            {item.filesCount > 0 && (
                              <p className="text-gray-300 text-xs sm:text-sm">
                                <span className="font-medium">
                                  Reference Files:
                                </span>{" "}
                                {item.filesCount} files uploaded
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}
              </motion.div>

              {/* Next Steps */}
              <motion.div
                className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 sm:p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                  What happens next?
                </h3>
                <div className="text-left space-y-2 sm:space-y-3 text-gray-300">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-primary font-bold text-sm sm:text-base">
                      1.
                    </span>
                    <p className="text-sm sm:text-base">
                      You&apos;ll receive a confirmation email with all your
                      order details within the next few minutes.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-primary font-bold text-sm sm:text-base">
                      2.
                    </span>
                    <p className="text-sm sm:text-base">
                      Our design team will review your requirements and start
                      working on your project.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-primary font-bold text-sm sm:text-base">
                      3.
                    </span>
                    <p className="text-sm sm:text-base">
                      We&apos;ll send you the first draft within 3-7 business
                      days for your review.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-primary font-bold text-sm sm:text-base">
                      4.
                    </span>
                    <p className="text-sm sm:text-base">
                      You&apos;ll get 2 free revisions to make sure the design
                      is perfect!
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <button
                  onClick={() => {
                    console.log("Navigating to /order");
                    window.location.href = "/order";
                  }}
                  className="bg-primary text-white px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 text-sm sm:text-base text-center"
                >
                  Order More Designs
                </button>
                <button
                  onClick={() => {
                    console.log("Navigating to /#contact");
                    window.location.href = "/#contact";
                  }}
                  className="border border-white/20 text-white px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-all text-sm sm:text-base text-center"
                >
                  Contact Us
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="text-center px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ExclamationTriangleIcon className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 mx-auto mb-3 sm:mb-4" />
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                Payment Pending
              </h1>
              <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
                Your payment is still being processed. Please wait a moment or
                contact us if you have any concerns.
              </p>
              <button
                onClick={() => {
                  console.log("Navigating to /order from error state");
                  window.location.href = "/order";
                }}
                className="bg-primary text-white px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-primary/90 transition-all text-sm sm:text-base"
              >
                Back to Orders
              </button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
