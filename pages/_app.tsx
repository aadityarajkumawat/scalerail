import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`w-full h-full`}>
      <Navbar />
      <Component {...pageProps} />
      <div className="fixed bottom-2 right-2 px-2 py-1 text-black bg-white bg-opacity-70 border-2 border-zinc-700 rounded z-[1000]">
        Under Mainteinance
      </div>
    </main>
  );
}
