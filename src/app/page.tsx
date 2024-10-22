import type { AppProps } from "next/app";
import Home from "./home/page";
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Home />
  );
}
