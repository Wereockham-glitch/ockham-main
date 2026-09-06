import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Media({ image, video, active = false, priority = false, sizes, alt }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setFailed(false); setLoaded(false); }, [video]);
  useEffect(() => {
    if (!ref.current) return;
    if (active) ref.current.play().catch(() => {});
    else ref.current.pause();
  }, [active, video, failed]);
  if (!image?.sourceUrl) return null;
  return <span className="editorial-media">
    <Image src={image.sourceUrl} alt={alt || image.altText || ""}
      width={image.mediaDetails?.width || 800} height={image.mediaDetails?.height || 450}
      sizes={sizes} priority={priority} className="editorial-image" />
    {video && !failed && <video ref={ref} src={active || loaded ? video : undefined}
      muted loop playsInline autoPlay={active} preload="none"
      onLoadedData={() => setLoaded(true)} onError={() => setFailed(true)}
      className={`editorial-preview-video ${loaded ? "is-loaded" : ""}`} aria-hidden="true" />}
  </span>;
}
