import Image from "next/image";
import videoLocalMovil from '../../public/video/minivideo.mp4'
import Logo from '../../public/img/logo.png'
import { useRef,useEffect, useState } from "react";

const Cabecera = ({
  height,
  imagenCabecera,
  imagenCabeceraUrl,
  imagenCabeceraAlt,
  videoCabeceraRef,
  videoCabecera,
  fullscreen,
}) => {

  const [videoFull, setvideoFull] = useState(false)
  const [videoFullM, setvideoFullM] = useState(false)
  const refVideo = useRef()
  const refVideoM = useRef()
  const refVideoBlur = useRef()


  const hoverEnterHandle = ()=>{
    setvideoFull(true)
    const videoUrl = refVideo.current.getAttribute("data-src");
    // const dataSrc = activeVideo.getAttribute("data-src")
    refVideoBlur.current.pause()
    refVideoBlur.current.className += ' opacity-0'
    if (!refVideo.current.getAttribute("src")) {
      refVideo.current.setAttribute("src", videoUrl);
    }
  }


 useEffect(() => {
  const videoElement = refVideo.current;
  const videoElementM = refVideoM.current;

    const handleTimeUpdate = () => {
      // Check if the video has been playing for at least one second
      if (videoElement.currentTime >= 1) {
        // Do something with the video
        setvideoFull(true)
      }

      if (videoElementM.currentTime >= 1) {
        // Do something with the video
        setvideoFullM(true)
      }
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElementM.addEventListener('timeupdate', handleTimeUpdate);

    // Clean up the event listener when the component is unmounted
    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElementM.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);


  return (
    <div
      className={`${
        fullscreen ? `opacity-0` : `opacity-100`
      } transition-opacity z-[60]  relative overflow-hidden `}
    >
      <div
           
      style={{minHeight:'100vh', height: height }}

      className={`relative  w-full h-full`}>
      {/* <VideoAnimation /> */}

        {imagenCabecera && (
          <Image
            priority
            src={imagenCabeceraUrl}
            alt={"Ockham Studio"}
            className="object-cover scale-125 blur-[12px] "
            fill
          />
        )} 
        <div 
       className="absolute mix-blend-difference z-[80] max-w-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 md:p-12">
          <Image
          priority={true}
          src={Logo}
          alt={'Ockham Logo'}
          title={'Ockham'}
          />
        </div>
        {videoLocalMovil && (
          <video
            loop
            ref={refVideoBlur}
            autoPlay
            style={{minHeight:'100vh', height: height }}
            muted
            poster={""}
            playsInline
            src={videoLocalMovil}
            alt={imagenCabeceraAlt}
            className={`block blur-[32px]  scale-125 w-full h-full z-40   object-cover`}
          ></video>
        )}
     
         { <video
          loop

          ref={refVideo}
          muted
          poster={""}
          playsInline
          autoPlay
          src={videoCabecera ? videoCabecera : videoCabecera}
          alt={imagenCabeceraAlt}
          className={`hidden md:block  duration-700  transition-all w-full h-full z-50  object-cover absolute top-0 pointer-events-none ${videoFull?'opacity-1':'opacity-0'}`}
        />
        }
                  { <video
          loop

          ref={refVideoM}
          muted
          poster={""}
          playsInline
          autoPlay
          src={'https://player.vimeo.com/progressive_redirect/playback/829099279/rendition/360p/file.mp4?loc=external&signature=5522cf813eaed7a848f821dc329a344dd3d25b8f08b96cf3b09917c01bf3e0c5'}
          alt={imagenCabeceraAlt}
          className={`block md:hidden  duration-700  transition-all w-full h-full z-50  object-cover absolute top-0 pointer-events-none ${videoFullM?'opacity-1':'opacity-0'}`}
        />
        }

         

        
      </div>
    </div>
  );
};

export default Cabecera;
