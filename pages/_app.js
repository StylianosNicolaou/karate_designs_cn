import "../styles/globals.css";
import Loader from "../components/Loader";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Loader />
      <Component {...pageProps} />
    </>
  );
}
