import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

export default function OrderSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
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
              console.log(
                "uploadedFileUrls from metadata:",
                data.metadata.uploadedFileUrls
              );

              const emailData = {
                orderData: {
                  customerName: data.metadata.customerName,
                  customerEmail: data.customer_email,
                  socialPlatform: data.metadata.socialPlatform,
                  socialUsername: data.metadata.socialUsername,
                  serviceType: data.metadata.serviceType,
                  selectedColors: data.metadata.selectedColors,
                  comments: data.metadata.comments,
                  uploadedFilesCount: data.metadata.uploadedFilesCount,
                  uploadedFileUrls: (() => {
                    const urls = [];
                    let index = 1;
                    while (data.metadata[`uploadedFileUrl${index}`]) {
                      urls.push(data.metadata[`uploadedFileUrl${index}`]);
                      index++;
                    }
                    return urls;
                  })(),
                },
                sessionId: data.id,
              };

              console.log("Sending email with data:", emailData);

              // Send notification to designer
              fetch("/api/send-order-notification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emailData),
              }).catch((emailError) => {
                console.log("Designer email notification failed:", emailError);
                // Don't show error to user, just log it
              });

              // Send confirmation to customer
              fetch("/api/send-customer-confirmation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emailData),
              }).catch((emailError) => {
                console.log("Customer confirmation email failed:", emailError);
                // Don't show error to user, just log it
              });
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to verify payment");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [session_id]);

  return (
    <>
      <Head>
        <title>Payment Successful - Karate Designs CN</title>
        <meta
          name="description"
          content="Your payment has been processed successfully. We'll contact you within 24 hours."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon-64x64.png" />
      </Head>

      <Navbar />

      <main className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
              <p className="text-gray-300">Verifying your payment...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ExclamationTriangleIcon className="w-20 h-20 text-yellow-500 mx-auto mb-6" />

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Payment Verification Error
              </h1>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                We encountered an issue verifying your payment. Please contact
                us directly with your order details.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-primary/30"
                >
                  Back to Home
                </Link>
                <a
                  href="mailto:karatedesignscn@gmail.com"
                  className="border border-white/20 text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-all"
                >
                  Contact Support
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Payment Successful!
              </h1>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Thank you for your order! Your payment has been processed
                successfully and we&apos;ve received all your design
                requirements.
              </p>

              {/* Payment Details */}
              {sessionData && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-left">
                  <h2 className="text-xl font-semibold text-white mb-4 text-center">
                    Order Details
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Order ID:</span>
                      <span className="text-white font-mono text-sm">
                        {sessionData.id.substring(0, 20)}...
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Service:</span>
                      <span className="text-white">
                        {sessionData.metadata?.serviceType || "Custom Design"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Amount Paid:</span>
                      <span className="text-primary font-bold">
                        €{(sessionData.amount_total / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Customer Email:</span>
                      <span className="text-white">
                        {sessionData.customer_email}
                      </span>
                    </div>
                    {sessionData.metadata?.socialPlatform &&
                      sessionData.metadata?.socialUsername && (
                        <div className="flex justify-between">
                          <span className="text-gray-300">
                            {sessionData.metadata.socialPlatform}:
                          </span>
                          <span className="text-white">
                            {sessionData.metadata.socialPlatform === "Instagram"
                              ? "@"
                              : ""}
                            {sessionData.metadata.socialUsername}
                          </span>
                        </div>
                      )}
                    <div className="flex justify-between">
                      <span className="text-gray-300">Payment Status:</span>
                      <span className="text-green-400 capitalize">
                        {sessionData.payment_status}
                      </span>
                    </div>
                    {sessionData.metadata?.selectedColors && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">Color Scheme:</span>
                        <span className="text-white">
                          {sessionData.metadata.selectedColors}
                        </span>
                      </div>
                    )}
                    {sessionData.metadata?.uploadedFilesCount &&
                      parseInt(sessionData.metadata.uploadedFilesCount) > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-300">
                            Reference Images:
                          </span>
                          <span className="text-white">
                            {sessionData.metadata.uploadedFilesCount} files
                            uploaded
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              )}

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                  What happens next?
                </h2>
                <div className="space-y-3 text-left">
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      1
                    </span>
                    <p className="text-gray-300">
                      We&apos;ll review your requirements and contact you via
                      email or phone within 24 hours
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      2
                    </span>
                    <p className="text-gray-300">
                      We&apos;ll discuss timeline, clarify any details, and
                      begin the design process
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      3
                    </span>
                    <p className="text-gray-300">
                      You&apos;ll receive your first design draft for review and
                      feedback
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      4
                    </span>
                    <p className="text-gray-300">
                      After 2 free revisions, you&apos;ll receive
                      high-resolution final files
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-primary/30"
                >
                  Back to Home
                </Link>
                <Link
                  href="/#gallery"
                  className="border border-white/20 text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-all"
                >
                  View Our Work
                </Link>
              </div>

              <p className="text-gray-400 text-sm mt-8">
                Questions about your order? Email us at{" "}
                <a
                  href="mailto:karatedesignscn@gmail.com"
                  className="text-primary hover:text-primary/80"
                >
                  karatedesignscn@gmail.com
                </a>
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
