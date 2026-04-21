import { useRef, useState } from "react";
import { gql } from "@apollo/client";
import { getApolloClient } from "@/lib/apollo";
import { use100vh } from "react-div-100vh";
import "animate.css";
import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";
import Head from "next/head";
const Cabecera = dynamic(() => import("./components/Cabecera"), {
  ssr: true,
});

const Proyectos = dynamic(() => import("./components/Proyectos"), {
  ssr: true,
});
export default function Home({ page = undefined, fullscreen, setFullscreen }) {
  const height = use100vh();
  const cHeight = height ? height : "100vh";
  const cHeightFooter = height + 15 ? height + 15 : "calc(100vh + 15px)";
  const cHeightCabecera = height + 48 ? height + 48 : "calc(100vh + 48px)";

  const { listadoProyectos } = page?.page;
  const { cabecera } = page?.page;
  const { seo } = page?.page;
  const { imagenCabecera } = cabecera;
  const imagenCabeceraUrl = imagenCabecera?.sourceUrl;
  const imagenCabeceraAlt = imagenCabecera?.altText;
  const imagenCabeceraWidth = imagenCabecera?.mediaDetails?.width;
  const imagenCabeceraHeight = imagenCabecera?.mediaDetails?.height;
  const imagenCabeceraName = imagenCabecera?.mediaDetails?.sizes.name;
  const { logo } = cabecera;
  const logoUrl = logo?.sourceUrl;

  const { videoCabecera } = cabecera;
  const { videoCabeceraMp4 } = cabecera;

  const videoCabeceraRef = useRef();

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="M8O_jObW0JmqCHH2V8LlQjB28AxWR2dUy4NcWwLNUXU"
        />
      </Head>
      <NextSeo
        title={seo?.title}
        description={
          "OCKHAM is a film director. We see the image as a space for expression and communication."
        }
        openGraph={{
          url: "https://ockham.studio",
          title: seo?.title,
          description:
            "OCKHAM is a film director. We see the image as a space for expression and communication.",
          images: [
            {
              url: seo?.opengraphImage.sourceUrl,
              width: 200,
              height: 200,
              alt: "OCKHAM is a film director. We see the image as a space for expression and communication.",
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
      />

      <div className="animate__animated animate__fadeIn  bg-white">
        <Cabecera
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
          height={cHeightCabecera}
          imagenCabecera={imagenCabecera}
          imagenCabeceraAlt={imagenCabeceraAlt}
          imagenCabeceraUrl={imagenCabeceraUrl}
          videoCabeceraMp4={videoCabeceraMp4}
          videoCabecera={videoCabecera}
          videoCabeceraRef={videoCabeceraRef}
        />
        <Proyectos
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
          listadoProyectos={listadoProyectos}
        />
        <Cabecera
          height={cHeightFooter}
          imagenCabecera={imagenCabecera}
          imagenCabeceraAlt={imagenCabeceraAlt}
          imagenCabeceraUrl={imagenCabeceraUrl}
          videoCabeceraMp4={videoCabeceraMp4}
          videoCabecera={videoCabecera}
          videoCabeceraRef={videoCabeceraRef}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
        />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query IndexContent {
        page(id: "home", idType: URI) {
          cabecera {
            imagenCabecera {
              sourceUrl
              altText
              mediaDetails {
                height
                width
                sizes {
                  name
                }
              }
            }
            logo {
              sourceUrl
              altText
              mediaDetails {
                height
                width
                sizes {
                  name
                }
              }
            }
            videoCabecera
            videoCabeceraMp4 {
              sourceUrl
            }
          }
          listadoProyectos {
            proyectos {
              ... on Proyectos {
                id
                title
                contenidoProyecto {
                  mosaico {
                    video
                    image {
                      sourceUrl
                      sizes
                      altText
                      title
                      base64 {
                        base64field
                      }
                      mediaDetails {
                        height
                        width
                        sizes {
                          name
                        }
                      }
                    }
                    size
                    index
                    columnStart
                    yPosition
                    xPosition
                  }
                  collage {
                    credits

                    slider {
                      image {
                        altText
                        sourceUrl
                        title
                        base64 {
                          base64field
                        }
                        mediaDetails {
                          height
                          width
                        }
                      }

                      videoDesktop
                      videoMobile
                    }
                  }
                  sliderYCrDitos {
                    credits
                    zoom
                    slider {
                      image {
                        altText
                        title
                        sourceUrl
                        mediaDetails {
                          height
                          width
                        }
                      }
                      videoOrigen
                      videoDesktop
                      videoMobile
                    }
                  }
                  infoThumbnail
                  videoOrigen
                  videoThumbnail
                }
              }
            }
          }
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
