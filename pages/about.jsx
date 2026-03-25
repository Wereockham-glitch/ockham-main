import { use100vh } from "react-div-100vh";
import "animate.css";
// import { NextSeo } from "next-seo";
import { getApolloClient } from "@/lib/apollo";
import { gql } from "@apollo/client";

export default function Home({ page = undefined }) {
  const height = use100vh();
  const cHeight = height ? height - 40 * 2 : "calc(100vh - 2rem)";
  // const { seo } = page?.page;

  return (
    <>
      {/* <NextSeo
        title={seo?.title ?? ""}
        description={seo?.metaDesc ?? ""}
        openGraph={{
          url: "https://ockham.studio/about",
          title: seo?.title ?? "",
          description: seo?.metaDesc ?? "",
          images: [
            {
              url: seo?.opengraphImage?.sourceUrl ?? "",
              width: 200,
              height: 200,
              alt: seo?.opengraphImage?.altText,
              type: "image/jpeg",
            },
          ],
          siteName: seo?.title,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      /> */}
      <div className="animate__animated animate__fadeIn bg-white">
        <div
          style={{ minHeight: cHeight }}
          className="overflow-hidden max-w-[1560px] mx-auto flex flex-col justify-center relative z-30 items-center "
        >
          <div className="h-full  p-8 tracking-tighter text-center">
            <div className="text-lg md:text-5xl uppercase  mx-auto  mb-8 font-condensed">
              OCKHAM is a director duo comprised of Lucas Couto and Cora Patiño.
              We see the image as a space for expression and communication.
            </div>
          </div>
        </div>
        <div className="p-8 flex justify-between  text-xl uppercase   pb-8 font-condensed">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://vimeo.com/weareockham"
          >
            VIMEO
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/weareockham"
          >
            INSTAGRAM
          </a>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query AboutContent {
        page(id: "about", idType: URI) {
          seo {
            fullHead

            title
            metaDesc

            opengraphAuthor
            opengraphDescription
            opengraphTitle
            opengraphDescription

            opengraphImage {
              altText
              sourceUrl
              srcSet
            }
            twitterImage {
              altText
              sourceUrl
              srcSet
            }
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
