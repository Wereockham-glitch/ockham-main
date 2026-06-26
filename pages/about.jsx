import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import AboutImage from "../public/img/about.jpg";
import { getApolloClient } from "@/lib/apollo";
import { gql } from "@apollo/client";

export default function About({ page = undefined }) {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);

  const goToAbout = () => {
  console.log("CLICK ABOUT");

  setShowOverlay(true);

  setTimeout(() => {
    console.log("PUSHING TO ABOUT");
    window.location.href = "/about";
  }, 1500);
};

  return (
    <>
      {/* White transition overlay */}
      <div
  className={`fixed inset-0 z-[99999] pointer-events-none backdrop-blur-md transition-all duration-[1500ms] ${
    showOverlay ? "opacity-100 bg-white/70" : "opacity-0 bg-white/0"
  }`}
/>

      <div className="bg-white min-h-screen px-8 pt-4 pb-8 flex flex-col">
        {/* Texto */}
        <div className="max-w-[760px] leading-tight font-condensed text-[13px] md:text-[17px]">
          <div
            onClick={goHome}
            className="block cursor-pointer hover:opacity-60 transition-opacity duration-500"
          >
            <p>
              We’re <strong>OCKHAM</strong>, a directing duo based between Madrid,
              by Lucas Couto and Cora Patiño.
            </p>
          </div>

          <p className="mt-4">
            Working across film and art direction, our practice combines visual
            precision with emotional intuition, creating images that feel both raw
            and carefully constructed.
          </p>

          <p className="mt-4">
            We develop commercial, narrative and art-driven projects, shaping
            visual worlds through direction, production design and creative
            development.
          </p>
        </div>

        {/* Imagen */}
        <div className="mt-8">
          <Image
            src={AboutImage}
            alt="Lucas and Cora"
            className="w-full max-w-[380px] h-auto"
            priority
          />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-16 flex justify-between items-end font-condensed">
          <div className="text-[14px] md:text-[18px]">
            <a href="mailto:weareockham@gmail.com">mail</a>
          </div>

          <div className="flex flex-col items-end gap-1 text-[14px] md:text-[18px]">
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