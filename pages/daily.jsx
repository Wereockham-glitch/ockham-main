import { NextSeo } from "next-seo";
import { pageSeo, site } from "@/lib/site.mjs";
import DailyGrid from "./components/DailyGrid";

export default function Daily() {
  return (
    <>
      <NextSeo {...pageSeo({
        title: "Daily — LUAR",
        description: "Daily visual journal by LUAR — images, references, fragments and moments from our creative process.",
        path: "/daily",
        image: {
          url: `${site.origin}/img/daily/1.jpg`,
          width: 720,
          height: 510,
          alt: "LUAR Daily",
          type: "image/jpeg",
        },
      })} />

      <div className="bg-white min-h-screen">
        <DailyGrid />
      </div>
    </>
  );
}
