import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Head>
        <title>IP Checker</title>
      </Head>
    </>
  );
}

export default MyApp;
