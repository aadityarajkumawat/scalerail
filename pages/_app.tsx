import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function getAuthCode(asPath: string) {
  const r = asPath;
  return r.substring(2).split("&")[0].split("=")[1];
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const authCode = getAuthCode(router.asPath);
    if (authCode) {
      localStorage.setItem("auth_code", authCode);
      router.push("/");
    }
  }, []);

  return (
    <main className={`w-full h-full`}>
      <Component {...pageProps} />
    </main>
  );
}
