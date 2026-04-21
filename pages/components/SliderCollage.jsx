import Image from "next/image";
import { useEffect, useState } from "react";

import { use100vh } from "react-div-100vh";

const Collage = ({ collage, imagePriority }) => {
  const credits = collage?.credits;
  const sliderData = collage?.slider;
  const height = use100vh();
  const cHeight = height ? height - 56 : "calc(100vh - 56px)";

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % sliderData?.length);
    }, 200); // Change this value to adjust the speed of the animation

    return () => clearInterval(intervalId);
  }, [currentIndex, sliderData]);
  return (
    <>
      {sliderData && (
        <div
          style={{ minHeight: cHeight }}
          className="flex items-center justify-center my-12 relative"
        >
          {sliderData?.map((slide, i) => {
            const zIndex = i === currentIndex ? sliderData?.length : i;
            return (
              <div key={i}>
                {slide.image?.sourceUrl && (
                  <div
                    style={{ zIndex: zIndex }}
                    className="absolute top-1/2 z-40 -translate-x-1/2 -translate-y-1/2"
                  >
                    {slide.image?.base64?.base64field ? (
                      <Image
                        priority={imagePriority}
                        placeholder="blur"
                        blurDataURL={slide.image?.base64?.base64field}
                        alt={
                          slide?.image?.altText
                            ? slide?.image?.altText
                            : slide?.image?.title
                        }
                        className="mx-auto max-w-5xl  "
                        src={slide.image?.sourceUrl}
                        width={slide.image?.mediaDetails.width}
                        height={slide.image?.mediaDetails.height}
                      />
                    ) : (
                      <Image
                        priority={imagePriority}
                        alt={
                          slide?.image?.altText
                            ? slide?.image?.altText
                            : slide?.image?.title
                        }
                        className="mx-auto max-w-5xl  "
                        src={slide.image?.sourceUrl}
                        width={slide.image?.mediaDetails.width}
                        height={slide.image?.mediaDetails.height}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Collage;
