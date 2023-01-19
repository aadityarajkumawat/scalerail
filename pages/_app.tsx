import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query);
  }, []);

  return (
    <main className={`w-full h-full`}>
      <Component {...pageProps} />
    </main>
  );
}
