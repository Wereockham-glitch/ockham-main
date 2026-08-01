import Mosaico from "./Mosaico";
import Slider from "./Slider";

import Collage from "./SliderCollage";
import { useRef, useEffect, useCallback } from "react";

const Proyectos = ({
  listadoProyectos,
  fullscreen,
  setFullscreen,
  setFullscreenUrl,
  setActiveThumb,
  setThumbs,
  cycle,
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
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const options = { threshold: isDesktop ? 0.55 : 0.2 };
    const observer = new IntersectionObserver(handleIntersect, options);
    const elementsRef = isDesktop ? sceneRefs : projectRefs;
    if (elementsRef.current && observer) {
      createObserver(elementsRef, observer);
    }

    return () => observer.disconnect();
  }, [handleIntersect]);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
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
  }, []);

  projectRefs.current = [];
  sceneRefs.current = [];

  return (
  <div className="home-project-list mt-4 pb-[10vh]">
    {proyectos?.map((p, i) => {
      const { contenidoProyecto } = p;
      const { sliderYCrDitos } = contenidoProyecto;
      const { collage } = contenidoProyecto;
      const slider = sliderYCrDitos;
      const { mosaico } = contenidoProyecto;
      const videoOrigen = contenidoProyecto?.videoOrigen;
      const isWiZLight = p.id === "cG9zdDo0ODE=";
      const thumbId = `st-${i}`;

      let imagePriority = false;
      if (i <= 30) {
        imagePriority = true;
      }

      return (
        <div
          className={`home-project ${
            fullscreen ? "opacity-0" : "opacity-100"
          } transition-opacity ${
            i === proyectos.length - 1 ? "mt-[4vh]" : ""
          }`}
          data-cycle={cycle}
          data-project-id={p.id}
          data-thumb-id={thumbId}
          key={p.id}
          ref={(el) => {
            projectRefs.current[i] = el;
          }}
        >
          <div
            className={`home-project-scene home-mosaic-scene ${
              fullscreen ? "opacity-0" : "opacity-100"
            }`}
            data-cycle={cycle}
            data-project-id={p.id}
            data-scene="mosaic"
            data-thumb-id={thumbId}
            ref={(el) => {
              sceneRefs.current[i * 2] = el;
            }}
          >
            {mosaico && (
              <Mosaico
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
            data-project-id={p.id}
            data-scene="video"
            data-thumb-id={thumbId}
            ref={(el) => {
              sceneRefs.current[i * 2 + 1] = el;
            }}
          >
            {slider && (
              <Slider
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
      })}

    </div>
  );
};

export default Proyectos;
