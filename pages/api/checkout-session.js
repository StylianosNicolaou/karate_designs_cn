import stripe from "../../lib/stripe";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { session_id } = req.query;

      if (!session_id) {
        return res.status(400).json({ error: "Session ID is required" });
      }

      // Retrieve the checkout session from Stripe
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"],
      });

      // Return relevant session data
      res.status(200).json({
        id: session.id,
        payment_status: session.payment_status,
        customer_email: session.customer_email,
        amount_total: session.amount_total,
        currency: session.currency,
        metadata: session.metadata,
        line_items: session.line_items,
        created: session.created,
      });
    } catch (err) {
      console.error("Error retrieving checkout session:", err);
      res.status(500).json({
        error: "Failed to retrieve checkout session",
        details:
          process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
