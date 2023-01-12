import "../styles/globals.css";
import type { AppProps } from "next/app";
import { centuryGothic } from "../centuryGothicFont";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${centuryGothic.className} w-full h-full`}>
      <Component {...pageProps} />
    </main>
  );
}
