import dynamic from "next/dynamic";
import Mosaico from "./Mosaico";
import Slider from "./Slider";

import Collage from "./SliderCollage";
import Thumb from "./Thumb";
import { useRef, useEffect, useState } from "react";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Proyectos = ({ listadoProyectos, fullscreen, setFullscreen }) => {
  const proyectos = listadoProyectos?.proyectos;
  const [activeThumb, setActiveThumb] = useState();
  const [fullscreenUrl, setFullscreenUrl] = useState();
  const [thumbs, setThumbs] = useState([]);

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
  }, [proyectos]);

  const elsRef = useRef([]);

  const handleIntersect = (entries) => {
    const [entry] = entries;
    const videos = entry.target.querySelectorAll("video");
    videos.forEach((video) => {
      const videoUrl = video.getAttribute("data-src");
      // const dataSrc = activeVideo.getAttribute("data-src")
      if (!video.getAttribute("src")) {
        video.setAttribute("src", videoUrl);
      }
      // if (entry.isIntersecting) {
      //   video.play();
      // } else {
      //   video.pause();
      // }
    });

    if (entry.isIntersecting) {
      setActiveThumb(entry.target.id);
    }
  };

  const createObserver = (elsRef, observer) => {
    if (elsRef.current && observer)
      elsRef.current.forEach((el) => {
        if (el) {
          observer.observe(el);
        }
      });
  };

  useEffect(() => {
    const options = { threshold: 0.2 };
    const observer = new IntersectionObserver(handleIntersect, options);
    if (elsRef.current && observer) {
      createObserver(elsRef, observer);
    }
  }, []);

  return (
    <div className="mt-12">
      {proyectos?.map((p, i) => {
        const { contenidoProyecto } = p;
        const { sliderYCrDitos } = contenidoProyecto;
        const { collage } = contenidoProyecto;
        const slider = sliderYCrDitos;
        const { mosaico } = contenidoProyecto;
        const videoOrigen = contenidoProyecto?.videoOrigen
        let imagePriority = false;
        if (i <= 30) {
          imagePriority = true;
        }
        return (
          <div
            className={`${
              fullscreen ? `opacity-0` : `opacity-100`
            } transition-opacity`}
            id={`st-${i}`}
            key={i}
            ref={(el) => (elsRef.current = [...elsRef.current, el])}
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

      <Thumb
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        setFullscreenUrl={setFullscreenUrl}
        proyectos={proyectos}
        activeThumb={activeThumb}
        thumbs={thumbs}
      />
      <Fullscren
        setFullscreen={setFullscreen}
        fullscreenUrl={fullscreenUrl}
        fullscreen={fullscreen}
      />
    </div>
  );
};

export default Proyectos;

{
  /* <ReactPlayer controls={true} className=" max-w-xs" url={contenidoProyecto?.videoOrigen} /> */
}

const Fullscren = ({ fullscreenUrl, setFullscreen, fullscreen }) => {
  const [videoReady, setvideoReady] = useState(false);
  const prevUrl = useRef()
  useEffect(() => {
   

      

  }, [fullscreenUrl])
  return (
    <div
      className={`${
        fullscreen
          ? `opacity-100  -translate-x-1/2 -translate-y-1/2 scale-100`
          : `opacity-0 scale-90 -translate-x-1/4 -translate-y-1/4  pointer-events-none`
      }   transition-all  h-full z-40 bg-black w-full flex items-center justify-center duration-500 fixed top-1/2 left-1/2`}
    >
      <ReactPlayer
        playing={fullscreen ? true : false}
        onReady={() => setvideoReady(true)}
        pip={true}
        stopOnUnmount={false}
        controls={true}
        className={`videovimeo w-full z-20`}
        url={fullscreenUrl}
        volume={fullscreen ? 1 : 0}
        muted={fullscreen ? false : true}
      />
      <div
        onClick={() => (setFullscreen(false), setvideoReady(false))}
        className="close-video uppercase flex items-center  text-white justify-center font-condensed z-0 absolute left-0 top-0 w-full h-full"
      >
        <span className="mt-16">Just a sec.</span>
        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white cursor-pointer">
          Close
        </span>
      </div>
    </div>
  );
};

// style={{filter:videoReady?'blur(0)':'blur(20px)'}}
