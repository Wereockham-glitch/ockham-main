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
      data-project-id={project.id}
      data-thumb-id={thumbId}
      ref={projectRef}
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

  const handleIntersect = useCallback(
    (entries) => {
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
    [setActiveThumb]
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
    const options = { threshold: isDesktop ? 0.55 : 0.2 };
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

  projectRefs.current = [];
  sceneRefs.current = [];

  return (
  <div className="home-project-list mt-4 pb-[10vh]">
    {proyectos?.map((p, i) => {
      const imagePriority = i <= 30;

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

    </div>
  );
};

export default Proyectos;
