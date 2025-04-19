import "../styles/globals.css";
import Loader from "../components/Loader";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Loader />
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights/>
    </>
  );
}
