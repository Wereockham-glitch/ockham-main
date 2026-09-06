import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import AboutImage from "../public/img/about.jpg";
import { getApolloClient } from "@/lib/apollo";
import { gql } from "@apollo/client";
import { usePageTransition } from "./components/PageTransition";

export default function About({ page = undefined }) {
  const { handleLinkClick } = usePageTransition();

  return (
    <>
    <NextSeo
  title={page?.page?.seo?.title || "About — OCKHAM"}
  description={
    page?.page?.seo?.metaDesc ||
    "OCKHAM is a directing duo based in Madrid. Lucas Couto and Cora Patiño work across film, commercials and visual storytelling."
  }
  openGraph={{
    url: "https://ockham.studio/about",
    title: page?.page?.seo?.title || "About — OCKHAM",
    description:
      page?.page?.seo?.metaDesc ||
      "OCKHAM is a directing duo based in Madrid. Lucas Couto and Cora Patiño work across film, commercials and visual storytelling.",
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
      <div className="editorial-about bg-white min-h-screen px-[14px] md:px-6 pt-[21px] pb-8 flex flex-col">
        {/* Texto */}
       {/* Texto */}
<div className="editorial-about-copy font-condensed tracking-[-0.025em]">
  <Link
    href="/"
    onClick={(event) => handleLinkClick(event, "/")}
    className="block cursor-pointer hover:opacity-60 transition-opacity duration-500"
  >
    <div className="space-y-1">
      <p>
        <span className="md:hidden">
          <span className="block whitespace-nowrap">
            We’re <strong>OCKHAM</strong>, a directing duo
          </span>
          <span className="block whitespace-nowrap">based between Madrid,</span>
          <span className="block whitespace-nowrap">
            by Lucas Couto and Cora Patiño.
          </span>
        </span>
        <span className="hidden md:inline">
          We’re <strong>OCKHAM</strong>, a directing duo based in Madrid, by
          Lucas Couto and Cora Patiño.
        </span>
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
  </Link>
</div>

        {/* Imagen */}
        <div className="editorial-about-image mt-8 w-[205px] md:w-auto">
          <Image
            src={AboutImage}
            alt="Lucas and Cora"
            className="w-full max-w-[420px] h-auto"
            priority
          />
        </div>

        {/* Footer */}
        <div className="editorial-about-footer mt-auto pt-16 flex justify-between items-end font-condensed">
          <div>
            <a href="mailto:weareockham@gmail.com">mail</a>
          </div>

          <div className="flex flex-col items-end gap-0.5">
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
