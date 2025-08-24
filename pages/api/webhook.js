import { buffer } from "micro";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      try {
        // Parse cart items from metadata
        const cartItems = [];
        const totalItems = parseInt(session.metadata?.totalItems) || 0;

        for (let i = 0; i < totalItems; i++) {
          const prefix = `item_${i}`;
          const quantity =
            parseInt(session.metadata[`${prefix}_quantity`]) || 1;

          const item = {
            serviceId: session.metadata[`${prefix}_serviceId`],
            quantity: quantity,
            designPreferences: {},
            uploadedFiles: [],
          };

          // Parse design preferences for each section (when quantity > 1)
          for (let sectionIndex = 0; sectionIndex < quantity; sectionIndex++) {
            const sectionPrefix = `${prefix}_section_${sectionIndex}`;
            item.designPreferences[`colorScheme_${sectionIndex}`] =
              session.metadata[`${sectionPrefix}_colorScheme`] || "";
            item.designPreferences[`customColor1_${sectionIndex}`] =
              session.metadata[`${sectionPrefix}_customColor1`] || "";
            item.designPreferences[`customColor2_${sectionIndex}`] =
              session.metadata[`${sectionPrefix}_customColor2`] || "";
            item.designPreferences[`comments_${sectionIndex}`] =
              session.metadata[`${sectionPrefix}_comments`] || "";
          }

          // Parse uploaded files for this item
          const filesCount =
            parseInt(session.metadata[`${prefix}_filesCount`]) || 0;
          for (let f = 0; f < filesCount; f++) {
            const fileUrl = session.metadata[`${prefix}_file${f}_url`];
            const fileName = session.metadata[`${prefix}_file${f}_name`];
            const fileType = session.metadata[`${prefix}_file${f}_type`];

            if (fileUrl) {
              item.uploadedFiles.push({
                url: fileUrl,
                name: fileName,
                type: fileType,
              });
            }
          }

          cartItems.push(item);
        }

        // Create order data
        const orderData = {
          id: session.id,
          customerName: session.metadata.customerName,
          customerEmail: session.customer_email,
          socialPlatform: session.metadata.socialPlatform,
          socialUsername: session.metadata.socialUsername,
          totalItems: totalItems,
          totalAmount: session.amount_total,
          cartItems: cartItems,
          paymentStatus: session.payment_status,
          createdAt: new Date().toISOString(),
          status: "pending", // pending, in_progress, completed, cancelled
        };

        // Save order to database or file system
        // For now, we'll log it and could save to a JSON file or database
        console.log("Order completed:", orderData);

        // TODO: Save to database (e.g., MongoDB, PostgreSQL, or Vercel KV)
        // await saveOrderToDatabase(orderData);

        // Send email notifications
        try {
          // Send notification to designer
          await fetch(
            `${
              process.env.NEXT_PUBLIC_DOMAIN || "http://karatedesignscn.com"
            }/api/send-order-notification`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderData,
                sessionId: session.id,
              }),
            }
          );

          // Send confirmation to customer
          await fetch(
            `${
              process.env.NEXT_PUBLIC_DOMAIN || "http://karatedesignscn.com"
            }/api/send-customer-confirmation`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderData,
                sessionId: session.id,
              }),
            }
          );
        } catch (emailError) {
          console.error("Email notification failed:", emailError);
          // Don't fail the webhook for email errors
        }

        console.log(`Order ${session.id} processed successfully`);
      } catch (error) {
        console.error("Error processing order:", error);
        return res.status(500).json({ error: "Failed to process order" });
      }
      break;

    case "payment_intent.succeeded":
      console.log("Payment succeeded:", event.data.object.id);
      break;

    case "payment_intent.payment_failed":
      console.log("Payment failed:", event.data.object.id);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
}
