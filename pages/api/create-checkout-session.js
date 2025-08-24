import stripe from "../../lib/stripe";

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
      const { customerInfo, cartItems } = req.body;

      // Validate required fields
      if (
        !customerInfo?.name ||
        !customerInfo?.email ||
        !customerInfo?.socialPlatform ||
        !customerInfo?.socialUsername
      ) {
        return res.status(400).json({
          error:
            "Missing required fields: name, email, social platform, or social username",
        });
      }

      // Validate cart items
      if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({
          error: "Cart is empty or invalid",
        });
      }

      // Create line items for each cart item
      const lineItems = cartItems.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.service.name,
            description: `Quantity: ${item.quantity}`,
            images: ["https://karatedesignscn.com/logo.png"],
          },
          unit_amount: item.service.price, // Already in cents
        },
        quantity: item.quantity,
      }));

      // Calculate total
      const total = cartItems.reduce(
        (sum, item) => sum + item.service.price * item.quantity,
        0
      );

      // Prepare metadata for each item (optimized to stay under 50 keys)
      const itemMetadata = {};
      cartItems.forEach((item, index) => {
        const prefix = `item_${index}`;
        itemMetadata[`${prefix}_serviceId`] = item.service.id;
        itemMetadata[`${prefix}_quantity`] = item.quantity.toString();

        // Handle design preferences for each item section (when quantity > 1)
        for (let i = 0; i < item.quantity; i++) {
          const sectionPrefix = `${prefix}_section_${i}`;
          itemMetadata[`${sectionPrefix}_colorScheme`] =
            item.designPreferences?.[`colorScheme_${i}`] || "";
          itemMetadata[`${sectionPrefix}_customColor1`] =
            item.designPreferences?.[`customColor1_${i}`] || "";
          itemMetadata[`${sectionPrefix}_customColor2`] =
            item.designPreferences?.[`customColor2_${i}`] || "";
          itemMetadata[`${sectionPrefix}_comments`] =
            item.designPreferences?.[`comments_${i}`] || "";
        }

        // Handle uploaded files (optimized to stay under 50 keys)
        if (item.uploadedFiles && item.uploadedFiles.length > 0) {
          const maxFilesPerSection = 5;
          const maxTotalFiles = maxFilesPerSection * item.quantity;
          const maxFiles = Math.min(item.uploadedFiles.length, maxTotalFiles);
          itemMetadata[`${prefix}_filesCount`] = maxFiles.toString();

          // Store file URLs in metadata (optimized format to reduce keys)
          item.uploadedFiles.slice(0, maxFiles).forEach((file, fileIndex) => {
            // Combine file info into a single key to reduce metadata keys
            const fileInfo = {
              url: file.url || file,
              name: file.name || `File ${fileIndex + 1}`,
              type: file.type || "unknown",
              sectionIndex: file.sectionIndex?.toString() || "0",
            };
            itemMetadata[`${prefix}_file${fileIndex}`] =
              JSON.stringify(fileInfo);
          });
        } else {
          itemMetadata[`${prefix}_filesCount`] = "0";
        }
      });

      // Check metadata key count and warn if approaching limit
      const metadataKeys = Object.keys({
        customerName: customerInfo.name,
        socialPlatform: customerInfo.socialPlatform,
        socialUsername: customerInfo.socialUsername,
        totalItems: cartItems.length.toString(),
        totalAmount: total.toString(),
        ...itemMetadata,
      });

      if (metadataKeys.length > 45) {
        console.warn(
          `Warning: Metadata has ${metadataKeys.length} keys (limit is 50)`
        );
      }

      // Determine the correct domain for success/cancel URLs
      const getDomain = () => {
        // Get the host from the request headers
        const host = req.headers.host;

        // Check if we're in development (localhost)
        if (host && host.includes("localhost")) {
          return `http://${host}`;
        }

        // Check if we're in development environment
        if (process.env.NODE_ENV === "development") {
          return "http://localhost:3000";
        }

        // Use environment variable or default to production domain
        return process.env.NEXT_PUBLIC_DOMAIN || "https://karatedesignscn.com";
      };

      const domain = getDomain();

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${domain}/order-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domain}/checkout?cancelled=true`,
        customer_email: customerInfo.email,
        metadata: {
          customerName: customerInfo.name,
          socialPlatform: customerInfo.socialPlatform,
          socialUsername: customerInfo.socialUsername,
          totalItems: cartItems.length.toString(),
          totalAmount: total.toString(),
          ...itemMetadata,
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
