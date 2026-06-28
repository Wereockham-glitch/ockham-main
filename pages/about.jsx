import { useState } from "react";
import Image from "next/image";
import { NextSeo } from "next-seo";
import AboutImage from "../public/img/about.jpg";
import { getApolloClient } from "@/lib/apollo";
import { gql } from "@apollo/client";

export default function About({ page = undefined }) {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);

  const goHome = () => {
    setShowOverlay(true);

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <>
    <NextSeo
  title={page?.page?.seo?.title || "About — OCKHAM"}
  description={
    page?.page?.seo?.metaDesc ||
    "OCKHAM is a directing duo based between Madrid. Lucas Couto and Cora Patiño work across film, commercials and visual storytelling."
  }
  openGraph={{
    url: "https://ockham.studio/about",
    title: page?.page?.seo?.title || "About — OCKHAM",
    description:
      page?.page?.seo?.metaDesc ||
      "OCKHAM is a directing duo based between Madrid. Lucas Couto and Cora Patiño work across film, commercials and visual storytelling.",
    images: [
      {
        url: "https://ockham.studio/img/about.jpg",
        width: 1200,
        height: 630,
        alt: "OCKHAM About",
      },
    ],
    siteName: "OCKHAM",
  }}
/>
      {/* White transition overlay */}
      <div
        className={`fixed inset-0 z-[99999] pointer-events-none backdrop-blur-md transition-all duration-[1500ms] ${
          showOverlay ? "opacity-100 bg-white/70" : "opacity-0 bg-white/0"
        }`}
      />

      <div className="bg-white min-h-screen px-8 pt-4 pb-8 flex flex-col">
        {/* Texto */}
       {/* Texto */}
<div className="max-w-[640px] font-condensed text-[17px] leading-[1.2] tracking-[-0.035em]">
  <div
    onClick={goHome}
    className="block cursor-pointer hover:opacity-60 transition-opacity duration-500"
  >
    <div className="space-y-1">
      <p>
        We’re <strong>OCKHAM</strong>, a directing duo based between Madrid, by
        Lucas Couto and Cora Patiño.
      </p>

      <p>
        Working across film and art direction, our practice combines visual
        precision with emotional intuition, creating images that feel both raw
        and carefully constructed.
      </p>

      <p>
        We develop commercial, narrative and art-driven projects, shaping visual
        worlds through direction, production design and creative development.
      </p>
    </div>
  </div>
</div>

        {/* Imagen */}
        <div className="mt-8">
          <Image
            src={AboutImage}
            alt="Lucas and Cora"
            className="w-full max-w-[420px] h-auto"
            priority
          />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-16 flex justify-between items-end font-condensed">
          <div className="text-[11px] md:text-[14px] tracking-[-0.02em]">
            <a href="mailto:weareockham@gmail.com">mail</a>
          </div>

          <div className="flex flex-col items-end gap-0.5 text-[11px] md:text-[14px] tracking-[-0.02em]">
            <a
              href="https://vimeo.com/ockhamduo"
              target="_blank"
              rel="noreferrer"
            >
              vimeo
            </a>

            <a
              href="https://www.instagram.com/ockham.duo/"
              target="_blank"
              rel="noreferrer"
            >
              @ockham.duo
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query AboutContent {
        page(id: "about", idType: URI) {
          seo {
            title
            metaDesc
          }
        }
      }
    `,
  });

  const page = {
    ...data?.data,
  };

  return {
    props: {
      page,
    },
  };
}