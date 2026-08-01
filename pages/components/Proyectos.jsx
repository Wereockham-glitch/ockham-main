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

  const elsRef = useRef([]);

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
          setActiveThumb(entry.target.id);
        }
      });
    },
    [setActiveThumb]
  );

  const createObserver = (elsRef, observer) => {
     if (elsRef.current && observer)
      elsRef.current.forEach((el) => {
        if (el) {
          observer.observe(el);
        }
      });
  };

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const options = { threshold: isDesktop ? 0.55 : 0.2 };
    const observer = new IntersectionObserver(handleIntersect, options);
    if (elsRef.current && observer) {
      createObserver(elsRef, observer);
    }

    return () => observer.disconnect();
  }, [handleIntersect]);

  elsRef.current = [];

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
          id={`st-${i}`}
          key={i}
          ref={(el) => {
  elsRef.current[i] = el;
}}
        >
            {/* <div>{p.title}</div> */}
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
        );
      })}

    </div>
  );
};

export default Proyectos;
