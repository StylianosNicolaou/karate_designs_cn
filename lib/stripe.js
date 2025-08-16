import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

// Initialize Stripe.js on the client side
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

// Initialize Stripe on the server side
let stripe;

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
} else {
  console.error("STRIPE_SECRET_KEY environment variable is not set");
  // Create a dummy stripe instance for development
  stripe = null;
}

export { getStripe };
export default stripe;
