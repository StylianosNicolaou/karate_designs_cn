import stripe from "../../lib/stripe";

// Service pricing configuration
const SERVICE_PRICES = {
  // Poster Design
  "tournament-poster": { price: 10000, name: "Tournament Poster" }, // $100.00
  "seminar-poster": { price: 9000, name: "Seminar Poster" }, // $90.00
  "team-poster": { price: 8000, name: "Team Poster" }, // $80.00
  "athlete-poster": { price: 8000, name: "Athlete Highlight Poster" },
  "training-camp-poster": { price: 9000, name: "Training Camp Poster" },
  "charity-poster": { price: 8000, name: "Charity Event Poster" },
  "fundraising-poster": { price: 8000, name: "Fundraising Event Poster" },

  // Banner Design
  "event-banner": { price: 15000, name: "Event Banner (Indoor & Outdoor)" },
  "dojo-banner": { price: 13000, name: "Dojo Banner" },
  "competition-banner": { price: 14000, name: "Competition Banner" },
  "rollup-banner": { price: 12000, name: "Roll-Up Banner" },
  "welcome-banner": { price: 13000, name: "Welcome Banner for Tournaments" },
  "podium-banner": { price: 16000, name: "Podium Backdrop Banner" },
  "large-banner": { price: 20000, name: "Large Format Banner (e.g., 4x3m)" },

  // Logo Design
  "dojo-logo": { price: 15000, name: "Karate Dojo Logo" },
  "tournament-logo": { price: 15000, name: "Tournament Logo" },
  "event-logo": { price: 14000, name: "Event Branding Logo" },
  "athlete-logo": { price: 13000, name: "Personal Brand Logo for Athletes" },
  "mascot-logo": { price: 18000, name: "Mascot Logo for Teams" },
  "patch-logo": { price: 10000, name: "Patch Logo for Gi (Uniform)" },

  // Package Deals
  "event-package": { price: 25000, name: "Event Branding Package" },
  "dojo-starter": { price: 35000, name: "Dojo Starter Pack" },
  "athlete-highlight": { price: 18000, name: "Athlete Highlight Pack" },
  "tournament-promo": { price: 40000, name: "Tournament Promo Pack" },

  // Default custom poster
  "custom-poster": { price: 4500, name: "Custom Poster Design" },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Check if Stripe is properly configured
      if (!stripe) {
        return res.status(500).json({
          error:
            "Stripe is not properly configured. Please check your environment variables.",
        });
      }
      const {
        name,
        email,
        socialPlatform,
        socialUsername,
        selectedColors,
        comments,
        serviceType = "custom-poster", // Default service
        customPrice, // For custom pricing
        uploadedFilesCount,

        uploadedFileUrls,
      } = req.body;

      // Validate required fields
      if (!name || !email || !socialPlatform || !socialUsername) {
        return res.status(400).json({
          error:
            "Missing required fields: name, email, social platform, or social username",
        });
      }

      // Get service pricing
      const serviceConfig =
        SERVICE_PRICES[serviceType] || SERVICE_PRICES["custom-poster"];
      const finalPrice = customPrice || serviceConfig.price;

      // Create order description
      const orderDescription = [
        `Service: ${serviceConfig.name}`,
        `${socialPlatform}: ${socialUsername}`,
        `Colors: ${selectedColors || "Not specified"}`,
        uploadedFilesCount
          ? `Reference Images: ${uploadedFilesCount} files`
          : "",
        comments
          ? `Notes: ${comments.substring(0, 80)}${
              comments.length > 80 ? "..." : ""
            }`
          : "",
      ]
        .filter(Boolean)
        .join(" | ");

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: serviceConfig.name,
                description: orderDescription,
                images: ["https://karatedesignscn.com/logo.png"], // Your logo
              },
              unit_amount: finalPrice, // Amount in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${
          process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"
        }/order-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${
          process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"
        }/order?cancelled=true`,
        customer_email: email,
        metadata: {
          customerName: name,
          socialPlatform: socialPlatform,
          socialUsername: socialUsername,
          selectedColors: selectedColors || "Not specified",
          comments: comments
            ? comments.substring(0, 100)
            : "No additional comments",
          serviceType: serviceType,
          uploadedFilesCount: uploadedFilesCount || 0,
          // Store URLs across multiple metadata fields to handle long URLs
          ...(uploadedFileUrls && uploadedFileUrls.length > 0
            ? (() => {
                const urls = uploadedFileUrls
                  .map((file) => (typeof file === "string" ? file : file.url))
                  .filter((url) => url);

                const urlFields = {};
                urls.forEach((url, index) => {
                  urlFields[`uploadedFileUrl${index + 1}`] = url;
                });

                return urlFields;
              })()
            : {}),
        },
        // Collect shipping address if needed for physical deliverables
        shipping_address_collection: {
          allowed_countries: [
            "US",
            "CA",
            "GB",
            "DE",
            "FR",
            "IT",
            "ES",
            "NL",
            "BE",
            "CH",
            "AT",
            "DK",
            "SE",
            "NO",
            "FI",
            "PT",
            "GR",
            "TR",
            "CN",
            "JP",
            "KR",
            "IN",
            "AU",
            "NZ",
            "RU",
            "UA",
            "PL",
            "CZ",
            "RO",
            "BG",
            "HR",
            "SI",
            "ME",
            "AL",
            "MK",
            "RS",
            "BA",
            "CY",
          ],
        },
        // Auto tax calculation (optional)
        automatic_tax: { enabled: false },
        // Invoice creation for business records
        invoice_creation: { enabled: true },
      });

      // Note: Email notification will be sent from the success page after payment confirmation

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      console.error("Stripe checkout session creation failed:", err);
      res.status(500).json({
        error: "Failed to create checkout session",
        details:
          process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
