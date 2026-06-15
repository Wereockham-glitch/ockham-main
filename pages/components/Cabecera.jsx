import Image from "next/image";

const Cabecera = ({
  height,
  imagenCabecera,
  imagenCabeceraUrl,
  imagenCabeceraAlt,
  videoCabeceraRef,
  videoCabecera,
  fullscreen,
}) => {

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
      </div>
    </div>
  );
};

export default Cabecera;
