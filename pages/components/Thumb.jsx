import { useRef, useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";

const Thumb = ({
  thumbs,
  activeThumb,
  setFullscreen,
  setFullscreenUrl,
  fullscreen,
}) => {
  const [loadedVideos, setLoadedVideos] = useState([
    { id: "", url: "", info: "" },
  ]);

  // Define a useRef to store the loaded video URLs
  const loadedUrlsRef = useRef({});

  useEffect(() => {
    const activeThumbObj = thumbs.find((thumb) =>
      thumb.ids.includes(activeThumb)
    );

    if (activeThumbObj) {
      const isVideoLoaded = loadedUrlsRef.current[activeThumbObj.url];
      if (!isVideoLoaded) {
        setLoadedVideos((loadedVideos) => [
          ...loadedVideos,
          {
            id: activeThumbObj.ids[0],
            url: activeThumbObj.url,
            info: activeThumbObj.infoThumbnail,
          },
        ]);
        // Mark the video URL as loaded
        loadedUrlsRef.current[activeThumbObj.url] = true;
      }
    }
  }, [activeThumb, thumbs, setLoadedVideos]);

  const videosRef = useRef([]);

  const thumbRef = useRef();
  const handleClick = () => {
    const activeThumbObj = thumbs.find((thumb) =>
      thumb.ids.includes(activeThumb)
    );

    if (activeThumbObj) {
      const { urlOrigen } = activeThumbObj;
      if (urlOrigen) {
        setFullscreenUrl(urlOrigen);
        setFullscreen((prev) => !prev);
      }
    }
  };
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);
  const isDragging = useRef(false);

  return (
    <>
      <div
        ref={constraintsRef}
        className="pointer-events-none fixed 
        top-2 left-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] 

        md:top-4 md:left-4 md:w-[calc(100%-2rem)] md:h-[calc(100%-2rem)] 
        
        z-50 "
      ></div>

      <motion.div
        className="fixed bottom-4 right-8 block w-full max-w-[160px] md:max-w-[256px]  z-40 after:absolute after:w-[calc(100%+6rem)] cursor-move after:origin-center after:-translate-x-[3rem] after:h-full after:-z-10  after:top-0"
        drag
        dragElastic={1}
        // onPointerDownCapture={e => e.stopPropagation()}
        // dragConstraints={constraintsRef}
        dragControls={dragControls}
        dragConstraints={constraintsRef}
      >
        {loadedVideos?.map((v, i) => {
          const isVisible = thumbs?.some(
            (thumb) => thumb.url === v.url && thumb.ids.includes(activeThumb)
          );

          const { info } = v;

          return (
            <div key={i}>
              {v.url && (
                <div
                  ref={thumbRef}
                  className={`${
                    fullscreen
                      ? "translate-y-full translate-x-full opacity-0"
                      : "translate-y-0 translate-x-0 opacity-100"
                  }
                  ${isVisible ? "block z-50" : "hidden z-0"}
                  transform-gpu  group delay-100    transition-all scale-100 duration-500 origin-bottom-right  border-transparent  `}
                >
                  {/* group mix-blend-difference md:hover:mix-blend-normal md:mix-blend-difference delay-75  cursor-pointer fixed transition-all scale-100 duration-500 origin-bottom-right bottom-4  md:bottom-4 z-40 max-w-[160px] md:max-w-xs right-4 border-transparent  `} */}

                  <span className="font-condensed pt-12 md:pt-24  cursor-move text-xs mb-2 block">
                    WATCH FULL PROJECT
                  </span>

                  <div
                    className={`border-yellow-400 md:border-transparent blur-0 md:group-hover:blur-0 md:blur-sm  duration-200 md:group-hover:border-yellow-400 border mix-blend-difference w-40 h-64  md:w-64 md:h-96  bg-black  relative transition-all `}
                    ref={(el) =>
                      (videosRef.current = [...videosRef.current, el])
                    }
                  >
                    {v.url && (
                      <video
                        onPointerDownCapture={(e) => e.stopPropagation()}
                        onClick={(e) => handleClick()}
                        className="w-full cursor-pointer h-full object-cover  top-0"
                        src={v.url}
                        loop
                        autoPlay
                        muted
                        preload={"none"}
                        playsInline
                      />
                    )}
                  </div>

                  <>
                    <div className="flex flex-col  cursor-move font-sans mt-3 text-xs text-left transition-all  text-black">
                      <div
                        className="min-h-[2rem] font-condensed"
                        dangerouslySetInnerHTML={{ __html: info && info }}
                      ></div>
                    </div>
                  </>
                </div>
              )}
            </div>
          );
        })}
      </motion.div>
    </>
  );
};

export default Thumb;
