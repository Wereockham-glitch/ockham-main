import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, EffectFade } from "swiper";

SwiperCore.use([Autoplay, EffectFade]);

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { use100vh } from "react-div-100vh";
import { useRef, useState } from "react";

const getMobileMediaOrientation = (sliderData) => {
  const mediaDetails = sliderData?.find(
    (slide) => slide.image?.mediaDetails?.width && slide.image?.mediaDetails?.height
  )?.image?.mediaDetails;

  if (!mediaDetails) return "horizontal";

  const ratio = mediaDetails.width / mediaDetails.height;
  if (ratio < 0.85) return "vertical";
  if (ratio <= 1.15) return "square";
  return "horizontal";
};

const Slider = ({
  variant = "desktop",
  slider,
  imagePriority,
  setFullscreen,
  setFullscreenUrl,
}) => {
  const credits = slider?.credits;
  const zoom = slider?.zoom;
  const sliderData = slider?.slider;
  const mobileMediaOrientation = getMobileMediaOrientation(sliderData);
  const height = use100vh();
  const cHeight = height ? height - 56 : "calc(100vh - 56px)";

  const el = useRef(null);

  const handleClick = (videoOrigen) => {
    setFullscreenUrl(videoOrigen);
    setFullscreen((prev) => !prev);
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onPositionChange = (position) => {
    setPosition({ x: position.position.x, y: position.position.y });
  };

  return (
    <div className="group relative">
      {sliderData && (
        <>
          <Swiper
            key={1 + "a"}
            className={`normal-swiper items-center justify-center flex flex-col mt-8 mb-2 md:my-8 ${
              variant === "mobileEditorial"
                ? `home-mobile-project-media home-mobile-project-media--${mobileMediaOrientation}`
                : "w-[68%] md:w-full"
            }`}
            data-orientation={
              variant === "mobileEditorial" ? mobileMediaOrientation : undefined
            }
            spaceBetween={50}
            slidesPerView={1}
            autoplay={
              sliderData.length > 1
                ? {
                    delay: 4000,
                    disableOnInteraction: false,
                  }
                : false
            }
            loop={false}
            speed={1800}
          >
            {sliderData?.map((slide, i) => {
              const { videoOrigen } = slide;

              if (!slide.image?.sourceUrl) return null;

              return (
                <SwiperSlide
                  key={i}
                  className="mb-2 md:mb-8 items-center justify-center"
                  onClick={() => videoOrigen && handleClick(videoOrigen)}
                >
                  <div
                    className={`${
                      videoOrigen
                        ? "border-yellow-400 md:border-transparent md:hover:border-yellow-400 border"
                        : ""
                    } relative overflow-hidden`}
                  >
                    {slide?.image?.base64?.base64field ? (
                      <Image
                        className={`mx-auto transition-all ${
                          videoOrigen ? "cursor-pointer hover:scale-110" : ""
                        }`}
                        src={slide.image?.sourceUrl}
                        width={slide.image?.mediaDetails.width}
                        height={slide.image?.mediaDetails.height}
                        alt={
                          slide?.image?.altText
                            ? slide?.image?.altText
                            : slide?.image?.title
                        }
                        blurDataURL={slide?.image?.base64?.base64field}
                        placeholder="blur"
                        priority={imagePriority}
                        quality={100}
                      />
                    ) : (
                      <Image
                        className={`mx-auto transition-all ${
                          videoOrigen ? "cursor-pointer hover:scale-110" : ""
                        }`}
                        src={slide.image?.sourceUrl}
                        width={slide.image?.mediaDetails.width}
                        height={slide.image?.mediaDetails.height}
                        loading={imagePriority ? "eager" : "lazy"}
                        alt={
                          slide?.image?.altText
                            ? slide?.image?.altText
                            : slide?.image?.title
                        }
                        priority={imagePriority}
                        quality={100}
                      />
                    )}

                    {variant === "desktop" && slide.videoDesktop && (
                      <video
                        loop
                        autoPlay
                        muted
                        ref={el}
                        poster=""
                        preload="none"
                        playsInline
                        data-src={slide.videoDesktop}
                        alt={
                          slide?.image?.altText
                            ? slide?.image?.altText
                            : "video"
                        }
                        className={`mx-auto duration-500 hidden md:block w-auto h-full z-40 scale-100 object-cover absolute top-0 ${
                          videoOrigen ? "cursor-pointer hover:scale-110" : ""
                        }`}
                      />
                    )}

                    {variant === "mobileEditorial" && slide.videoMobile && (
                      <video
                        loop
                        autoPlay
                        muted
                        ref={el}
                        poster=""
                        preload="none"
                        playsInline
                        data-src={slide.videoMobile}
                        alt={
                          slide?.image?.altText
                            ? slide?.image?.altText
                            : "video"
                        }
                        className="home-mobile-project-video block md:hidden w-auto h-full z-40 object-cover absolute top-0 mx-auto"
                      />
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {variant === "desktop" && credits && (
            <div
              className="font-sans text-[5px] leading-tight md:text-xs text-center mb-8 w-[68%] md:w-auto mx-auto"
              dangerouslySetInnerHTML={{ __html: credits }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Slider;
