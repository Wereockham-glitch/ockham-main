import dynamic from "next/dynamic";
import { useState } from "react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Fullscreen = ({ fullscreenUrl, setFullscreen, fullscreen }) => {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div
      className={`${
        fullscreen
          ? "opacity-100  -translate-x-1/2 -translate-y-1/2 scale-100"
          : "opacity-0 scale-90 -translate-x-1/4 -translate-y-1/4  pointer-events-none"
      }   transition-all  h-full z-40 bg-black w-full flex items-center justify-center duration-500 fixed top-1/2 left-1/2`}
    >
      <ReactPlayer
        playing={fullscreen ? true : false}
        onReady={() => setVideoReady(true)}
        pip={true}
        stopOnUnmount={false}
        controls={true}
        className="videovimeo w-full z-20"
        url={fullscreenUrl}
        volume={fullscreen ? 1 : 0}
        muted={fullscreen ? false : true}
      />
      <div
        onClick={() => (setFullscreen(false), setVideoReady(false))}
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

export default Fullscreen;
