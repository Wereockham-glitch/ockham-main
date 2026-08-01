import Image from "next/image";

const mobileColumnSpans = {
  "2_col": 3,
  "3_col": 4,
  "4_col": 5,
  "5_col": 6,
  "6_col": 7,
};

const getMobileGridPlacement = (size, columnStart) => {
  const span = mobileColumnSpans[size] || 6;
  const requestedStart = Number(columnStart?.split("_")[0]) || 1;
  const start = Math.min(requestedStart, 13 - span);

  return { span, start };
};

const Mosaico = ({
  variant = "desktop",
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
      {variant === "desktop" && (
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
      )}

      {variant === "mobileEditorial" && (
      <div className="home-mobile-project-mosaic grid grid-cols-12 gap-y-20 gap-x-1 px-4 pt-16 pb-10">
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

          const { span, start } = getMobileGridPlacement(size, columnStart);

          return (
            <div
              key={i}
              style={{
                gridColumn: `${start} / span ${span}`,
                transform: `translate(${xPosition ? xPosition : 0}%, ${
                  yPosition ? yPosition : 0
                }%)`,
              }}
              className="home-mobile-project-mosaic-item overflow-hidden flex items-start flex-col justify-center relative"
            >
              <div className="font-condensed text-[6px] tracking-[-0.02em] mb-0.5 select-none">
                {index}
              </div>

              <div
                className="home-mobile-project-mosaic-media relative w-full"
                data-square={isSquare ? "true" : undefined}
                data-wiz-light={isWiZLight ? "true" : undefined}
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
      )}
    </>
  );
};

export default Mosaico;
