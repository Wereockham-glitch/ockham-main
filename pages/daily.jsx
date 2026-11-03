import { NextSeo } from "next-seo";
import { pageSeo, site } from "@/lib/site.mjs";
import DailyGrid from "./components/DailyGrid";

export default function Daily() {
  const mockImages = [
    "/img/daily/1.jpg",
    "/img/daily/2.jpg",
    "/img/daily/3.jpg",
    "/img/daily/4.jpg",
    "/img/daily/5.jpg",
    "/img/daily/6.jpg",
    "/img/daily/7.jpg",
    "/img/daily/8.jpg",
    "/img/daily/9.jpg",
    "/img/daily/10.jpg",
    "/img/daily/11.jpg",
    "/img/daily/12.jpg",
    "/img/daily/13.jpg",
    "/img/daily/14.jpg",
    "/img/daily/15.jpg",
    "/img/daily/16.jpg",
    "/img/daily/17.jpg",
    "/img/daily/19.jpg",
    "/img/daily/20.jpg",
    "/img/daily/21.jpg",
  ];

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
        <DailyGrid images={mockImages} />
      </div>
    </>
  );
}
