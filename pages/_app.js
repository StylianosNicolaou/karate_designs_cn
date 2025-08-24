import "../styles/globals.css";
import Loader from "../components/Loader";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CartProvider } from "../components/CartProvider";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Loader />
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </CartProvider>
  );
}
