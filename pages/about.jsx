import Image from "next/image";
import AboutImage from "../public/img/about.jpg";
import "animate.css";
import { getApolloClient } from "@/lib/apollo";
import { gql } from "@apollo/client";

export default function About({ page = undefined }) {
  return (
    <div className="animate__animated animate__fadeIn bg-white min-h-screen px-8 pt-24 pb-8">
      
      {/* Texto */}
      className="max-w-[760px] leading-snug font-condensed text-[14px] md:text-[18px]"
        <p>
          We’re <strong>OCKHAM</strong>, a directing duo based between Madrid,
          by Lucas Couto and Cora Patiño.
        </p>

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
          className="w-full max-w-[320px] h-auto"
          priority
        />  
      </div>

      {/* Footer */}
      <div className="mt-16 flex justify-between items-end font-condensed">
        <div className="text-[14px] md:text-[18px]">
       <a href="mailto:weareockham@gmail.com">mail</a>
        </div>

        <div className="flex flex-col items-end gap-1 text-[14px] md:text-[18px]">
          <a
            href="https://vimeo.com/ockhamdirectors"
            target="_blank"
            rel="noreferrer"
          >
            vimeo
          </a>

          <a
            href="https://www.instagram.com/ockham_directors/"
            target="_blank"
            rel="noreferrer"
          >
            @ockham.duo
          </a>
        </div>
      </div>
    </div>
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