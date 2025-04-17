import "../styles/globals.css";
import Loader from "../components/Loader";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Loader />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
