import { useCallback, useEffect, useMemo, useState } from "react";
import { gql } from "@apollo/client";
import { getApolloClient } from "@/lib/apollo";
import { selectPortfolioProjects } from "@/lib/portfolio.mjs";
import { usePortfolio } from "@/components/portfolio/PortfolioContext";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Fullscreen from "./components/Fullscreen";
import Thumb from "./components/Thumb";
import InfinitePortfolio from "./components/InfinitePortfolio";

export default function Home({ page, fullscreen, setFullscreen, setFullscreenUrl }) {
  const { category } = usePortfolio();
  const projects = useMemo(() => (page?.page?.listadoProyectos?.proyectos || []).filter(project => project.category === category), [page, category]);
  const [activeId, setActiveId] = useState(projects[0]?.id || null);
  const [playerProject, setPlayerProject] = useState(null);
  const activeProject = projects.find(project => project.id === activeId) || projects[0] || null;
  const openProject = useCallback(project => {
    if (!project?.videoUrl) return;
    setPlayerProject(project);
    setFullscreenUrl(project.videoUrl);
    setFullscreen(true);
  }, [setFullscreen, setFullscreenUrl]);
  const closePlayer = useCallback(() => setFullscreen(false), [setFullscreen]);
  useEffect(() => {
    setActiveId(projects[0]?.id || null);
    setPlayerProject(null);
    setFullscreen(false);
    const viewport = document.querySelector(".home-scroll-viewport");
    if (viewport) viewport.scrollTop = 0;
  }, [projects, setFullscreen]);

      return (
        <>
          <Head>
      <meta
        name="google-site-verification"
        content="M8O_jObW0JmqCHH2V8LlQjB28AxWR2dUy4NcWwLNUXU"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "OCKHAM",
            url: "https://ockham.studio",
            logo: "https://ockham.studio/favicon.ico",
            description:
              "OCKHAM is a Madrid-based directing duo founded by Lucas Couto and Cora Patiño, creating work across film, commercials, and visual storytelling.",
            sameAs: [
              "https://www.instagram.com/ockham.duo/",
              "https://vimeo.com/ockhamduo"
            ],
            founder: [
              {
                "@type": "Person",
                name: "Lucas Couto"
              },
              {
                "@type": "Person",
                name: "Cora Patiño"
              }
            ]
          }),
        }}
      />
    </Head>
          <NextSeo
      title="OCKHAM — Directing Duo | Lucas Couto & Cora Patiño"
      description="OCKHAM is a Madrid-based directing duo founded by Lucas Couto and Cora Patiño, creating work across film, commercials, and visual storytelling."
      openGraph={{
        url: "https://ockham.studio",
        title: "OCKHAM — Directing Duo | Lucas Couto & Cora Patiño",
        description:
          "OCKHAM is a Madrid-based directing duo founded by Lucas Couto and Cora Patiño, creating work across film, commercials, and visual storytelling.",
        images: [
      {
        url: "https://ockham.studio/img/about.jpg",
        width: 1200,
        height: 630,
        alt: "OCKHAM — Directing Duo",
        type: "image/jpeg",
      },
    ],
        siteName: "OCKHAM",
      }}
      twitter={{
        cardType: "summary_large_image",
      }}
    />

          <main className="editorial-home">
            <div inert={fullscreen ? "" : undefined} aria-hidden={fullscreen || undefined}>
              {projects.length ? <InfinitePortfolio key={category} projects={projects} fullscreen={fullscreen}
                onOpen={openProject} onActiveProject={setActiveId} /> :
                <section className="editorial-empty" aria-live="polite">
                  <p>New films, coming soon.</p>
                </section>}
            </div>
            <Thumb project={activeProject} fullscreen={fullscreen} onOpen={openProject} />
            <Fullscreen project={playerProject} fullscreen={fullscreen} onClose={closePlayer} />
          </main>
        </>
      );
    }

    export async function getStaticProps({ locale }) {
      const apolloClient = getApolloClient();

      const data = await apolloClient.query({
        query: gql`
          query IndexContent {
            page(id: "home", idType: URI) {
              listadoProyectos {
                proyectos {
                  ... on Proyectos {
                    id
                    status
                    isPreview
                    isRestricted
                    slug
                    title
                    contenidoProyecto {
                      mosaico {
                        image {
                          sourceUrl
                          altText
                          mediaDetails {
                            height
                            width
                          }
                        }
                        index
                      }
                      collage {
                        credits

                        slider {
                          image {
                            altText
                            sourceUrl
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
            }
          }
        `,
      });
      const page = {
        page: {
          ...data.data.page,
          listadoProyectos: { proyectos: selectPortfolioProjects(data.data.page.listadoProyectos?.proyectos) },
        },
      };

      return {
        props: {
          page,
        },
      };
    }
