import Image from "next/image";
// import function to register Swiper custom elements
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper";
SwiperCore.use([Autoplay]);
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import { use100vh } from "react-div-100vh";
import { useRef, useState } from "react";
// import { register } from 'swiper/element/bundle';
// register Swiper custom elements

const Slider = ({ slider, imagePriority, setFullscreen, setFullscreenUrl }) => {
  const credits = slider?.credits;
  const zoom = slider?.zoom;
  const sliderData = slider?.slider;
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
       {/* <ReactCursorPosition
                      onPositionChanged={(position) =>
                        onPositionChange(position)
                      }
                    > */}
      {sliderData && (
        <Swiper
        key={1+'a'}
          className={
            "normal-swiper w-full items-center justify-center flex flex-col my-32"
          }
          spaceBetween={50}
          slidesPerView={1}
          autoplay={true}
          loop={true}
          speed={1000}
          style={{ minHeight: cHeight }}
        >
          {sliderData?.map((slide, i) => {
            const { videoOrigen } = slide;
            return (
              <div key={i}>
                {slide.image?.sourceUrl && (
                  <SwiperSlide
                    key={i}
                    className={"mb-8 items-center justify-center "}
                    onClick={() => videoOrigen && handleClick(videoOrigen)}
                  >
                   
                      <div
              
                        className={`${
                          videoOrigen &&
                          `border-yellow-400  md:border-transparent  md:hover:border-yellow-400 border`
                        } relative overflow-hidden`}
                      >
                        {slide?.image?.base64?.base64field ? (
                          <Image
                            className={`mx-auto transition-all ${
                              videoOrigen && ` cursor-pointer hover:scale-110 `
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
                              videoOrigen && `cursor-pointer hover:scale-110 `
                            } `}
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
                        {slide.videoDesktop && (
                          <video
                            loop
                            autoPlay
                            muted
                            ref={el}
                            // ref={el}
                            poster={""}
                            preload={"none"}
                            playsInline
                            data-src={slide.videoDesktop && slide.videoDesktop}
                            alt={
                              slide?.image?.altText
                                ? slide?.image?.altText
                                : "video"
                            }
                            className={`mx-auto duration-500 hidden md:block w-auto h-full z-40 scale-100 object-cover absolute top-0 ${
                              videoOrigen && ` cursor-pointer hover:scale-110 `
                            }`}
                          >
                            {/* <source src={slide.videoDesktop} type="video/mp4" /> */}
                          </video>
                        )}

                        {slide.videoMobile && (
                          <video
                            loop
                            autoPlay
                            muted
                            ref={el}
                            // ref={el}
                            poster={""}
                            preload={"none"}
                            playsInline
                            data-src={slide.videoMobile && slide.videoMobile}
                            alt={
                              slide?.image?.altText
                                ? slide?.image?.altText
                                : "video"
                            }
                            className={`block    md:hidden w-auto h-full z-40  object-cover absolute   top-0 mx-auto`}
                          >
                            {/* <source src={slide.videoDesktop} type="video/mp4" /> */}
                          </video>
                        )}
                      </div>
                  </SwiperSlide>
                )}
              </div>
            );
          })}
          <div
            className="font-sans text-xs text-center mb-24"
            dangerouslySetInnerHTML={{ __html: credits }}
          />
        </Swiper>
      )}






 
          {
            // zoom&& <div 
            // style={{transform:'translate('+position.x+'px,'+position.y+'px) scale(1.5)'}}
            // className="clone pointer-events-none group-hover:block hidden  absolute top-0 left-0 w-screen max-h-screen z-30">
      
            // {sliderData && (
            //   <Swiper
            //     className={
            //       "normal-swiper w-full items-center justify-center flex flex-col my-32"
            //     }
            //     key={1+'v'}
            //     spaceBetween={50}
            //     slidesPerView={1}
            //     autoplay={true}
            //     loop={true}
            //     speed={1000}
            //     style={{ minHeight: cHeight }}
            //   >
            //     {sliderData?.map((slide, i) => {
            //       const { videoOrigen } = slide;
            //       console.log(slide.image?.sourceUrl);
            //       return (
            //         <div key={i}>
            //           {slide.image?.sourceUrl && (
            //             <SwiperSlide
            //               key={i}
            //               className={"mb-8 items-center justify-center "}
            //               onClick={() => videoOrigen && handleClick(videoOrigen)}
            //             >
            //               <ReactCursorPosition
            //                 onPositionChanged={(position) =>
            //                   onPositionChange(position)
            //                 }
            //               >
            //                 <div
                    
         
            //                 >
            //                   {slide?.image?.base64?.base64field ? (
            //                     <Image
            //                       className={`mx-auto   `}
            //                       src={slide.image?.sourceUrl}
            //                       width={slide.image?.mediaDetails.width}
            //                       height={slide.image?.mediaDetails.height}
            //                       alt={
            //                         slide?.image?.altText
            //                           ? slide?.image?.altText
            //                           : slide?.image?.title
            //                       }
            //                       blurDataURL={slide?.image?.base64?.base64field}
            //                       placeholder="blur"
            //                       priority={imagePriority}
            //                       quality={100}
            //                     />
            //                   ) : (
            //                     <Image
            //                       className={`mx-auto  `}
            //                       src={slide.image?.sourceUrl}
            //                       width={slide.image?.mediaDetails.width}
            //                       height={slide.image?.mediaDetails.height}
            //                       loading={imagePriority ? "eager" : "lazy"}
            //                       alt={
            //                         slide?.image?.altText
            //                           ? slide?.image?.altText
            //                           : slide?.image?.title
            //                       }
            //                       priority={imagePriority}
            //                       quality={100}
            //                     />
            //                   )}
            //                   {slide.videoDesktop && (
            //                     <video
            //                       loop
            //                       autoPlay
            //                       muted
            //                       ref={el}
            //                       // ref={el}
            //                       poster={""}
            //                       preload={"none"}
            //                       playsInline
            //                       data-src={slide.videoDesktop && slide.videoDesktop}
            //                       alt={
            //                         slide?.image?.altText
            //                           ? slide?.image?.altText
            //                           : "video"
            //                       }
            //                       className={`mx-auto    duration-500  hidden md:block w-auto h-full z-40 scale-100 object-cover absolute  top-0 
                                  
            //                    `}
            //                     >
            //                       {/* <source src={slide.videoDesktop} type="video/mp4" /> */}
            //                     </video>
            //                   )}
      
            //                   {slide.videoMobile && (
            //                     <video
            //                       loop
            //                       autoPlay
            //                       muted
            //                       ref={el}
            //                       // ref={el}
            //                       poster={""}
            //                       preload={"none"}
            //                       playsInline
            //                       data-src={slide.videoMobile && slide.videoMobile}
            //                       alt={
            //                         slide?.image?.altText
            //                           ? slide?.image?.altText
            //                           : "video"
            //                       }
            //                       className={`block    md:hidden w-auto h-full z-40  object-cover absolute   top-0 mx-auto`}
            //                     >
            //                       {/* <source src={slide.videoDesktop} type="video/mp4" /> */}
            //                     </video>
            //                   )}
            //                 </div>
            //               </ReactCursorPosition>
            //             </SwiperSlide>
            //           )}
            //         </div>
            //       );
            //     })}
              
            //   </Swiper>
            // )}
            // </div>
          } 
{/*      
      </ReactCursorPosition> */}
    </div>
  );
};

export default Slider;
