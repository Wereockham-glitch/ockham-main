import "@/styles/index.css";
import "@/styles/index.scss";
import Header from "./components/Header";
import localFont from "@next/font/local";
const normalFont = localFont({
  src: "../public/font/texgyreheros-regular.ttf",
  variable: "--font-TexGyre",
  display: "swap",
});
const normalBoldFont = localFont({
  src: "../public/font/texgyreheros-bold.ttf",
  variable: "--font-TexGyreBold",
  display: "swap",
});
const conFont = localFont({
  src: "../public/font/texgyreheroscn-regular.ttf",
  variable: "--font-TexGyrecn",
  display: "swap",
});
import { useState } from "react";
import Scroller from "./components/Scroller";
import Layout from "./components/Layout";
import CustomCursor from "./components/CustomCursor";

export default function App({ Component, pageProps }) {
  const [fullscreen, setFullscreen] = useState();
  return (
    <div
      className={`${conFont.variable} ${normalFont.variable} ${normalBoldFont.variable}`}
    >
      <Layout fullscreen={fullscreen} setFullscreen={setFullscreen}>
        <Component
          setFullscreen={setFullscreen}
          fullscreen={fullscreen}
          {...pageProps}
        />
      </Layout>
    </div>
  );
}
