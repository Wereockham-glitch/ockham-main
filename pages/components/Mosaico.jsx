import Image from "next/image";

const Mosaico = ({
  mosaico,
  imagePriority,
  setFullscreen,
  setFullscreenUrl,
  videoOrigen,
  isWiZLight,
}) => {
  const handleClick = (videoOrigen) => {
    setFullscreenUrl(videoOrigen);
    setFullscreen((prev) => !prev);
  };

  return (
    <>
      <div className="home-project-collage hidden md:grid grid-cols-12 gap-y-20 gap-x-4 px-4 py-32">
        {mosaico?.map((m, i) => {
          const { index } = m;
          const { size } = m;
          const { columnStart } = m;
          const { xPosition } = m;
          const { yPosition } = m;
          const { image } = m;
          const sourceUrl = image?.sourceUrl;
          const base64field = image?.base64field;
          const mediaDetails = image?.mediaDetails;
          const altText = image?.image;
          const video = m?.video;

          const isSquare =
            mediaDetails?.width &&
            mediaDetails?.height &&
            Math.abs(mediaDetails.width - mediaDetails.height) < 20;

          let imageSize;
          switch (size) {
            case "2_col":
              imageSize = " col-span-12 md:col-span-2";
              break;
            case "3_col":
              imageSize = " col-span-12 md:col-span-3";
              break;
            case "4_col":
              imageSize = " col-span-12 md:col-span-4";
              break;
            case "5_col":
              imageSize = " col-span-12 md:col-span-5";
              break;
            case "6_col":
              imageSize = " col-span-12 md:col-span-6";
              break;
            default:
              break;
          }

          let imageStart;
          switch (columnStart) {
            case "1_start":
              imageStart = " md:col-start-1";
              break;
            case "2_start":
              imageStart = " md:col-start-2";
              break;
            case "3_start":
              imageStart = " md:col-start-3";
              break;
            case "4_start":
              imageStart = " md:col-start-4";
              break;
            case "5_start":
              imageStart = " md:col-start-5";
              break;
            case "6_start":
              imageStart = " md:col-start-6";
              break;
            case "7_start":
              imageStart = " md:col-start-7";
              break;
            case "8_start":
              imageStart = " md:col-start-8";
              break;
            case "9_start":
              imageStart = " md:col-start-9";
              break;
            case "10_start":
              imageStart = " md:col-start-10";
              break;
            case "11_start":
              imageStart = " md:col-start-11";
              break;
            case "12_start":
              imageStart = " md:col-start-12";
              break;
            default:
              break;
          }

          return (
            <div
              onClick={() => videoOrigen && handleClick(videoOrigen)}
              style={{
                transform: `translate(${xPosition ? xPosition : 0}%, ${
                  yPosition ? yPosition : 0
                }%)`,
              }}
              key={i}
              className={
                "home-project-collage-item" +
                `${imageStart}` +
                `${imageSize}` +
                ` overflow-hidden flex items-start flex-col justify-center relative`
              }
            >
              <div className="font-condensed text-[10px] tracking-[-0.02em] mb-1 select-none">
                {index}
              </div>

              <div
                className={`home-project-collage-media relative ${isSquare ? "w-[65%]" : "w-full"} ${
                  isWiZLight ? "scale-[0.88] origin-top-left" : ""
                }`}
              >
                {base64field ? (
                  <Image
                    alt={altText ? altText : image?.title}
                    src={sourceUrl}
                    width={mediaDetails?.width}
                    height={mediaDetails?.height}
                    className={
                      videoOrigen ? "w-full h-full border border-white" : ""
                    }
                    blurDataURL={base64field}
                    placeholder="blur"
                    priority={imagePriority}
                    quality={100}
                  />
                ) : (
                  <Image
                    alt={altText ? altText : image?.title}
                    src={sourceUrl}
                    loading={imagePriority ? "eager" : "lazy"}
                    width={mediaDetails?.width}
                    height={mediaDetails?.height}
                    className={
                      videoOrigen ? "w-full h-full border border-white" : ""
                    }
                    priority={imagePriority}
                    quality={100}
                  />
                )}

                {video && (
                  <video
                    loop
                    autoPlay
                    muted
                    poster=""
                    preload="none"
                    playsInline
                    data-src={video}
                    alt={altText ? altText : image?.title}
                  className={`mx-auto transition-all hidden md:block w-full h-full z-40 object-cover absolute top-0 ${
                      videoOrigen
                        ? "cursor-pointer border-yellow-400 md:border-transparent hover:border-yellow-400 border"
                        : ""
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid md:hidden grid-cols-12 gap-y-20 gap-x-1 px-4 pt-16 pb-10">
        {mosaico?.map((m, i) => {
          const { index } = m;
          const { size } = m;
          const { columnStart } = m;
          const { xPosition } = m;
          const { yPosition } = m;
          const { image } = m;
          const sourceUrl = image?.sourceUrl;
          const base64field = image?.base64field;
          const mediaDetails = image?.mediaDetails;
          const altText = image?.image;
          const video = m?.video;

          const isSquare =
            mediaDetails?.width &&
            mediaDetails?.height &&
            Math.abs(mediaDetails.width - mediaDetails.height) < 20;

          const imageSize = {
            "2_col": "col-span-2",
            "3_col": "col-span-3",
            "4_col": "col-span-4",
            "5_col": "col-span-5",
            "6_col": "col-span-6",
          }[size];

          const imageStart = {
            "1_start": "col-start-1",
            "2_start": "col-start-2",
            "3_start": "col-start-3",
            "4_start": "col-start-4",
            "5_start": "col-start-5",
            "6_start": "col-start-6",
            "7_start": "col-start-7",
            "8_start": "col-start-8",
            "9_start": "col-start-9",
            "10_start": "col-start-10",
            "11_start": "col-start-11",
            "12_start": "col-start-12",
          }[columnStart];

          return (
            <div
              key={i}
              style={{
                transform: `translate(${xPosition ? xPosition : 0}%, ${
                  yPosition ? yPosition : 0
                }%)`,
              }}
              className={`${imageStart || ""} ${
                imageSize || "col-span-12"
              } overflow-hidden flex items-start flex-col justify-center relative`}
            >
              <div className="font-condensed text-[5px] tracking-[-0.02em] mb-0.5 select-none">
                {index}
              </div>

              <div
                className={`relative ${isSquare ? "w-[65%]" : "w-full"} ${
                  isWiZLight ? "scale-[0.88] origin-top-left" : ""
                }`}
              >
                {base64field ? (
                  <Image
                    alt={altText ? altText : image?.title}
                    src={sourceUrl}
                    placeholder="blur"
                    width={mediaDetails?.width}
                    height={mediaDetails?.height}
                    className={
                      videoOrigen ? "w-full h-full border border-white" : ""
                    }
                    blurDataURL={base64field}
                    priority={imagePriority}
                  />
                ) : (
                  <Image
                    alt={altText ? altText : image?.title}
                    src={sourceUrl}
                    width={mediaDetails?.width}
                    height={mediaDetails?.height}
                    loading={imagePriority ? "eager" : "lazy"}
                    className={
                      videoOrigen ? "w-full h-full border border-white" : ""
                    }
                    priority={imagePriority}
                  />
                )}

                {video && (
                  <video
                    loop
                    autoPlay
                    muted
                    poster=""
                    preload="none"
                    playsInline
                    data-src={video}
                    alt={altText ? altText : image?.title}
                  className={`mx-auto transition-all hidden md:block w-full h-full z-40 object-cover absolute top-0 ${
                      videoOrigen
                        ? "border-yellow-400 md:border-transparent cursor-pointer hover:border-yellow-400 border"
                        : ""
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Mosaico;
