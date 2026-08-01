import Mosaico from "./Mosaico";
import Slider from "./Slider";

import Collage from "./SliderCollage";
import { useRef, useEffect, useCallback } from "react";

const DesktopProject = ({
  project,
  index,
  projectCount,
  cycle,
  fullscreen,
  setFullscreen,
  setFullscreenUrl,
  imagePriority,
  projectRef,
  mosaicSceneRef,
  videoSceneRef,
}) => {
  const { contenidoProyecto } = project;
  const slider = contenidoProyecto?.sliderYCrDitos;
  const collage = contenidoProyecto?.collage;
  const mosaico = contenidoProyecto?.mosaico;
  const videoOrigen = contenidoProyecto?.videoOrigen;
  const isWiZLight = project.id === "cG9zdDo0ODE=";
  const thumbId = `st-${index}`;

  return (
    <div
      className={`home-project ${
        fullscreen ? "opacity-0" : "opacity-100"
      } transition-opacity ${index === projectCount - 1 ? "mt-[4vh]" : ""}`}
      data-cycle={cycle}
      data-project-id={project.id}
      data-thumb-id={thumbId}
      ref={projectRef}
    >
      <div
        className={`home-project-scene home-mosaic-scene ${
          fullscreen ? "opacity-0" : "opacity-100"
        }`}
        data-cycle={cycle}
        data-project-id={project.id}
        data-scene="mosaic"
        data-thumb-id={thumbId}
        ref={mosaicSceneRef}
      >
        {mosaico && (
          <Mosaico
            variant="desktop"
            fullscreen={fullscreen}
            setFullscreen={setFullscreen}
            setFullscreenUrl={setFullscreenUrl}
            imagePriority={imagePriority}
            mosaico={mosaico}
            videoOrigen={videoOrigen}
            isWiZLight={isWiZLight}
          />
        )}
      </div>

      <div
        className={`home-project-scene home-video-scene ${
          fullscreen ? "opacity-0" : "opacity-100"
        }`}
        data-cycle={cycle}
        data-project-id={project.id}
        data-scene="video"
        data-thumb-id={thumbId}
        ref={videoSceneRef}
      >
        {slider && (
          <Slider
            variant="desktop"
            fullscreen={fullscreen}
            setFullscreen={setFullscreen}
            setFullscreenUrl={setFullscreenUrl}
            slider={slider}
            imagePriority={imagePriority}
          />
        )}
        {collage && (
          <Collage imagePriority={imagePriority} collage={collage} />
        )}
      </div>
    </div>
  );
};

const MobileProject = ({
  project,
  index,
  fullscreen,
  setFullscreen,
  setFullscreenUrl,
  imagePriority,
  projectRef,
  dataCycle,
}) => {
  const { contenidoProyecto } = project;
  const slider = contenidoProyecto?.sliderYCrDitos;
  const collage = contenidoProyecto?.collage;
  const mosaico = contenidoProyecto?.mosaico;
  const videoOrigen = contenidoProyecto?.videoOrigen;
  const isWiZLight = project.id === "cG9zdDo0ODE=";
  const thumbId = `st-${index}`;
  const credits = slider?.credits || collage?.credits;

  return (
    <article
      className={`home-mobile-project ${
        fullscreen ? "opacity-0" : "opacity-100"
      } transition-opacity`}
      data-cycle={dataCycle}
      data-project-id={project.id}
      data-thumb-id={thumbId}
      ref={projectRef}
    >
      <section
        className="home-mobile-scene home-mobile-mosaic-scene"
        data-mobile-scene="mosaic"
      >
        {mosaico && (
          <Mosaico
            variant="mobileEditorial"
            fullscreen={fullscreen}
            setFullscreen={setFullscreen}
            setFullscreenUrl={setFullscreenUrl}
            imagePriority={imagePriority}
            mosaico={mosaico}
            videoOrigen={videoOrigen}
            isWiZLight={isWiZLight}
          />
        )}
      </section>

      <section
        className="home-mobile-scene home-mobile-video-scene"
        data-mobile-scene="video"
      >
        {slider && (
          <Slider
            variant="mobileEditorial"
            fullscreen={fullscreen}
            setFullscreen={setFullscreen}
            setFullscreenUrl={setFullscreenUrl}
            slider={slider}
            imagePriority={imagePriority}
          />
        )}

        {collage && (
          <Collage imagePriority={imagePriority} collage={collage} />
        )}

        {credits && (
          <div
            className="home-mobile-project-credits font-sans text-[5px] leading-tight text-center mb-8 w-[68%] mx-auto"
            dangerouslySetInnerHTML={{ __html: credits }}
          />
        )}
      </section>
    </article>
  );
};

const Proyectos = ({
  listadoProyectos,
  fullscreen,
  setFullscreen,
  setFullscreenUrl,
  setActiveThumb,
  setThumbs,
  cycle,
  variant = "desktop",
  mobileLoopBridge = false,
}) => {
  const proyectos = listadoProyectos?.proyectos;

  useEffect(() => {
    if (proyectos && proyectos.length > 0) {
      const urlMap = new Map();

      proyectos.forEach((p, i) => {
        const { contenidoProyecto } = p;
        const url = contenidoProyecto?.videoThumbnail;
        const urlOrigen = contenidoProyecto?.videoOrigen;
        const infoThumbnail = contenidoProyecto?.infoThumbnail;
        const id = `st-${i}`; // Assuming 'st-' prefix is used for IDs

        if (urlMap.has(url)) {
          const urlObj = urlMap.get(url);
          urlObj.ids.push(id);
          urlObj.urlOrigen = urlOrigen;
          urlObj.infoThumbnail = infoThumbnail;
        } else {
          urlMap.set(url, { url, ids: [id], urlOrigen, infoThumbnail });
        }
      });

      const updatedThumbs = Array.from(urlMap.values());
      setThumbs(updatedThumbs);
    }
  }, [proyectos, setThumbs]);

  const projectRefs = useRef([]);
  const sceneRefs = useRef([]);
  const mobileListRef = useRef(null);
  const mobileBridgeRef = useRef(null);
  const mobileLoopSpacerRef = useRef(null);
  const mobileCycleHeightRef = useRef(0);
  const mobileLoopJumpingRef = useRef(false);

  const handleIntersect = useCallback(
    (entries) => {
      if (variant === "mobileEditorial") {
        entries.forEach((entry) => {
          entry.target.dataset.intersectionRatio = entry.isIntersecting
            ? entry.intersectionRatio.toString()
            : "0";

          if (entry.isIntersecting) {
            entry.target.querySelectorAll("video").forEach((video) => {
              const videoUrl = video.getAttribute("data-src");

              if (videoUrl && !video.getAttribute("src")) {
                video.setAttribute("src", videoUrl);
              }
            });
          }
        });

        const activeProject = projectRefs.current.reduce((current, project) => {
          if (!project) return current;

          const projectRatio = Number(project.dataset.intersectionRatio || 0);
          const currentRatio = Number(
            current?.dataset.intersectionRatio || 0
          );

          return projectRatio > currentRatio ? project : current;
        }, null);

        projectRefs.current.forEach((project) => {
          if (!project) return;

          const isActive = project === activeProject;
          project.dataset.active = isActive ? "true" : "false";
          project.querySelectorAll("video").forEach((video) => {
            if (isActive) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        });

        if (activeProject) {
          setActiveThumb(activeProject.dataset.thumbId);
        }

        return;
      }

      entries.forEach((entry) => {
        const videos = entry.target.querySelectorAll("video");
        entry.target.dataset.active = entry.isIntersecting ? "true" : "false";

        videos.forEach((video) => {
          if (entry.isIntersecting) {
            const videoUrl = video.getAttribute("data-src");

            if (videoUrl && !video.getAttribute("src")) {
              video.setAttribute("src", videoUrl);
            }

            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });

        if (entry.isIntersecting) {
          setActiveThumb(entry.target.dataset.thumbId);
        }
      });
    },
    [setActiveThumb, variant]
  );

  const createObserver = (elementsRef, observer) => {
     if (elementsRef.current && observer)
      elementsRef.current.forEach((el) => {
        if (el) {
          observer.observe(el);
        }
      });
  };

  useEffect(() => {
    const isDesktop = variant === "desktop";
    const options = {
      threshold: isDesktop ? 0.55 : [0, 0.25, 0.5, 0.75, 1],
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    const elementsRef = isDesktop ? sceneRefs : projectRefs;
    if (elementsRef.current && observer) {
      createObserver(elementsRef, observer);
    }

    return () => observer.disconnect();
  }, [handleIntersect, variant]);

  useEffect(() => {
    const isDesktop = variant === "desktop";
    const scrollRoot = sceneRefs.current[0]?.closest(
      ".home-scroll-viewport"
    );

    if (!isDesktop || !scrollRoot) return;

    let animationFrame;

    const updateSceneProgress = () => {
      const viewportTop = scrollRoot.getBoundingClientRect().top;
      const viewportHeight = scrollRoot.clientHeight;

      sceneRefs.current.forEach((scene) => {
        if (!scene) return;

        const sceneTop = scene.getBoundingClientRect().top - viewportTop;
        const distance = Math.min(Math.abs(sceneTop) / viewportHeight, 1);
        const progress = 1 - distance;
        const direction = sceneTop < 0 ? -1 : 1;
        const opacity = 0.45 + progress * 0.55;
        const translateY = direction * distance * 0;

        scene.style.setProperty(
            "--scene-progress-opacity",
            opacity.toFixed(3)
          );
        scene.style.setProperty(
            "--scene-progress-y",
            `${translateY.toFixed(2)}px`
          );
      });

      animationFrame = undefined;
    };

    const handleVisualScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateSceneProgress);
    };

    updateSceneProgress();
    scrollRoot.addEventListener("scroll", handleVisualScroll, {
      passive: true,
    });

    return () => {
      scrollRoot.removeEventListener("scroll", handleVisualScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [variant]);

  useEffect(() => {
    if (variant !== "mobileEditorial") return;

    const scrollRoot = projectRefs.current[0]?.closest(
      ".home-scroll-viewport"
    );
    const mobileScenes = projectRefs.current.flatMap((project) =>
      project ? Array.from(project.querySelectorAll(".home-mobile-scene")) : []
    );

    if (!scrollRoot || mobileScenes.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let animationFrame;

    const setScenesVisible = () => {
      mobileScenes.forEach((scene) => {
        scene.style.setProperty("--mobile-scene-opacity", "1");
      });
    };

    const updateMobileSceneProgress = () => {
      if (reducedMotion.matches || fullscreen) {
        setScenesVisible();
        animationFrame = undefined;
        return;
      }

      const viewportRect = scrollRoot.getBoundingClientRect();
      const viewportHeight = scrollRoot.clientHeight;
      const revealDistance = Math.max(viewportHeight * 0.35, 1);

      const sceneProgress = mobileScenes.map((scene) => {
        const sceneRect = scene.getBoundingClientRect();
        const sceneTop = sceneRect.top - viewportRect.top;
        const sceneBottom = sceneRect.bottom - viewportRect.top;
        const enterProgress = Math.min(
          Math.max((viewportHeight - sceneTop) / revealDistance, 0),
          1
        );
        const exitProgress = Math.min(
          Math.max(sceneBottom / revealDistance, 0),
          1
        );
        const progress = Math.min(enterProgress, exitProgress);
        const easedProgress = progress * progress * (3 - 2 * progress);

        return 0.55 + easedProgress * 0.45;
      });

      mobileScenes.forEach((scene, index) => {
        scene.style.setProperty(
          "--mobile-scene-opacity",
          sceneProgress[index].toFixed(3)
        );
      });

      animationFrame = undefined;
    };

    const handleMobileVisualScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateMobileSceneProgress);
    };

    const handleReducedMotionChange = () => {
      if (reducedMotion.matches) {
        setScenesVisible();
      } else {
        handleMobileVisualScroll();
      }
    };

    updateMobileSceneProgress();
    scrollRoot.addEventListener("scroll", handleMobileVisualScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleMobileVisualScroll);
    reducedMotion.addEventListener("change", handleReducedMotionChange);

    return () => {
      scrollRoot.removeEventListener("scroll", handleMobileVisualScroll);
      window.removeEventListener("resize", handleMobileVisualScroll);
      reducedMotion.removeEventListener("change", handleReducedMotionChange);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [fullscreen, variant]);

  useEffect(() => {
    if (variant !== "mobileEditorial" || !mobileLoopBridge) return;

    const firstProject = projectRefs.current[0];
    const bridgeProject = mobileBridgeRef.current;
    const list = mobileListRef.current;
    const spacer = mobileLoopSpacerRef.current;
    const scrollRoot = firstProject?.closest(".home-scroll-viewport");

    if (!firstProject || !bridgeProject || !list || !spacer || !scrollRoot) {
      return;
    }

    const measureMobileCycle = () => {
      const firstRect = firstProject.getBoundingClientRect();
      const bridgeRect = bridgeProject.getBoundingClientRect();
      mobileCycleHeightRef.current = bridgeRect.top - firstRect.top;

      const spacerHeight = `${scrollRoot.clientHeight}px`;
      if (spacer.style.height !== spacerHeight) {
        spacer.style.height = spacerHeight;
      }
    };

    const handleMobileLoop = () => {
      if (mobileLoopJumpingRef.current) return;

      const cycleHeight = mobileCycleHeightRef.current;
      const viewportTop = scrollRoot.getBoundingClientRect().top;
      const bridgeTop = bridgeProject.getBoundingClientRect().top - viewportTop;

      if (cycleHeight > 0 && bridgeTop <= 0) {
        mobileLoopJumpingRef.current = true;
        bridgeProject.querySelectorAll("video").forEach((video) => {
          video.pause();
        });
        scrollRoot.scrollTop -= cycleHeight;

        window.requestAnimationFrame(() => {
          mobileLoopJumpingRef.current = false;
        });
      }
    };

    const resizeObserver = new ResizeObserver(measureMobileCycle);
    resizeObserver.observe(list);
    resizeObserver.observe(firstProject);
    resizeObserver.observe(bridgeProject);

    measureMobileCycle();
    scrollRoot.addEventListener("scroll", handleMobileLoop, { passive: true });
    window.addEventListener("resize", measureMobileCycle);

    return () => {
      scrollRoot.removeEventListener("scroll", handleMobileLoop);
      window.removeEventListener("resize", measureMobileCycle);
      resizeObserver.disconnect();
    };
  }, [mobileLoopBridge, variant]);

  projectRefs.current = [];
  sceneRefs.current = [];

  return (
  <div
    className="home-project-list mt-4 pb-[10vh]"
    ref={mobileListRef}
  >
    {proyectos?.map((p, i) => {
      const imagePriority =
        variant === "mobileEditorial" ? i === 0 : i <= 30;

      if (variant === "mobileEditorial") {
        return (
          <MobileProject
            key={p.id}
            project={p}
            index={i}
            fullscreen={fullscreen}
            setFullscreen={setFullscreen}
            setFullscreenUrl={setFullscreenUrl}
            imagePriority={imagePriority}
            projectRef={(el) => {
              projectRefs.current[i] = el;
            }}
          />
        );
      }

      return (
        <DesktopProject
          key={p.id}
          project={p}
          index={i}
          projectCount={proyectos.length}
          cycle={cycle}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
          setFullscreenUrl={setFullscreenUrl}
          imagePriority={imagePriority}
          projectRef={(el) => {
            projectRefs.current[i] = el;
          }}
          mosaicSceneRef={(el) => {
            sceneRefs.current[i * 2] = el;
          }}
          videoSceneRef={(el) => {
            sceneRefs.current[i * 2 + 1] = el;
          }}
        />
        );
      })}

    {variant === "mobileEditorial" && mobileLoopBridge && proyectos?.[0] && (
      <MobileProject
        key={`mobile-loop-bridge-${proyectos[0].id}`}
        project={proyectos[0]}
        index={0}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        setFullscreenUrl={setFullscreenUrl}
        imagePriority={false}
        dataCycle="loop-bridge"
        projectRef={(el) => {
          projectRefs.current[proyectos.length] = el;
          mobileBridgeRef.current = el;
        }}
      />
    )}

    {variant === "mobileEditorial" && mobileLoopBridge && (
      <div ref={mobileLoopSpacerRef} aria-hidden="true" />
    )}

    </div>
  );
};

export default Proyectos;
