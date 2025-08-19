import stripe from "../../lib/stripe";

// Service pricing configuration
const SERVICE_PRICES = {
  // Poster Design
  "tournament-poster": { price: 9000, name: "Tournament Poster" }, // €90.00
  "team-poster": { price: 7000, name: "Team Poster" }, // €70.00
  "seminar-poster": { price: 8000, name: "Seminar Poster" }, // €80.00
  "athlete-poster": { price: 7000, name: "Athlete Highlight Poster" }, // €70.00
  "training-camp-poster": { price: 8000, name: "Training Camp Poster" }, // €80.00
  "custom-poster": { price: 100, name: "Custom Poster Design" }, // €45.00

  // Banner Design
  "event-banner": { price: 13000, name: "Event Banner" }, // €130.00
  "dojo-banner": { price: 12000, name: "Dojo Banner" }, // €120.00
  "competition-banner": { price: 12000, name: "Competition Banner" }, // €120.00
  "rollup-banner": { price: 11000, name: "Roll-Up Banner" }, // €110.00
  "social-media-banner": {
    price: 6000,
    name: "Social Media Banner (FB/Twitter/YouTube)",
  }, // €60.00

  // Logo Design
  "dojo-logo": { price: 14000, name: "Karate Dojo Logo" }, // €140.00
  "tournament-logo": { price: 14000, name: "Tournament Logo" }, // €140.00
  "athlete-logo": { price: 12000, name: "Personal Brand Logo" }, // €120.00
  "mascot-logo": { price: 16000, name: "Mascot Logo for Teams" }, // €160.00
  "minimal-logo": { price: 11000, name: "Minimal/Modern Logo (general use)" }, // €110.00

  // Social Media Graphics
  "instagram-post-pack": { price: 7000, name: "Instagram Post Pack (5 posts)" }, // €70.00
  "instagram-story-pack": {
    price: 6000,
    name: "Instagram Story Pack (5 stories)",
  }, // €60.00
  "social-media-ad": { price: 4000, name: "Facebook/Instagram Ad Design" }, // €40.00
  "athlete-social-pack": {
    price: 12000,
    name: "Athlete/Dojo Social Pack (10 posts + 5 stories)",
  }, // €120.00

  // Merch & Apparel Design
  "tshirt-design": { price: 6000, name: "T-Shirt Design" }, // €60.00
  "hoodie-design": { price: 7000, name: "Hoodie Design" }, // €70.00
  "gi-patch": { price: 5000, name: "Gi Patch / Dojo Patch" }, // €50.00
  "merchandise-pack": {
    price: 15000,
    name: "Merchandise Pack (T-shirt + Hoodie + Patch)",
  }, // €150.00

  // Event & Dojo Materials
  "certificate-design": {
    price: 5000,
    name: "Certificate Design (Belt / Participation / Achievement)",
  }, // €50.00
  "medal-design": { price: 6000, name: "Medal/Ribbon Design" }, // €60.00
  "ticket-design": { price: 4000, name: "Ticket/Pass Design" }, // €40.00
  "business-card": { price: 4000, name: "Business Card Design" }, // €40.00
  "flyer-single": { price: 5000, name: "Flyer/Leaflet (single side)" }, // €50.00
  "flyer-double": { price: 7000, name: "Flyer/Leaflet (double side)" }, // €70.00

  // Digital & Video Graphics
  "motion-poster": { price: 9000, name: "Motion Poster / Animated Social Ad" }, // €90.00
  "video-intro": { price: 12000, name: "Video Intro/Outro" }, // €120.00
  "tournament-promo-video": {
    price: 15000,
    name: "Tournament Promo Video (short edit)",
  }, // €150.00

  // Package Deals
  "event-branding-package": { price: 22000, name: "Event Branding Package" }, // €220.00
  "dojo-starter-pack": { price: 30000, name: "Dojo Starter Pack" }, // €300.00
  "athlete-highlight-pack": { price: 15000, name: "Athlete Highlight Pack" }, // €150.00
  "tournament-promo-pack": { price: 35000, name: "Tournament Promo Pack" }, // €350.00
  "social-media-growth-pack": {
    price: 20000,
    name: "Social Media Growth Pack",
  }, // €200.00
  "complete-dojo-identity-pack": {
    price: 50000,
    name: "Complete Dojo Identity Pack",
  }, // €500.00
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
          process.env.NEXT_PUBLIC_DOMAIN || "https://karatedesignscn.com"
        }/order-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${
          process.env.NEXT_PUBLIC_DOMAIN || "https://karatedesignscn.com"
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
