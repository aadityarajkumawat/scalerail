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
      (async () => {
        const res = await fetch(
          `https://auth.monday.com/oauth2/token?client_id=74399104e6f0f16764009a0d3e849d30&client_secret=32275daa1106dad8110a485849a59f16&code=${authCode}`
        );
        const data = await res.json();
        localStorage.setItem("access_token", data.access_token);
      })();
      // localStorage.setItem("auth_code", authCode);
      // router.push("/");
    }
  }, []);

  return (
    <main className={`w-full h-full`}>
      <Component {...pageProps} />
    </main>
  );
}
