import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function Thumb({ project, fullscreen, onOpen }) {
  const [mobile, setMobile] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef(null);
  const boundsRef = useRef(null);
  const initialTop = useRef(project?.composition?.previewTop || 21);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => { setMobile(media.matches); x.set(0); y.set(0); };
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [x, y]);

  useEffect(() => { setVideoFailed(false); }, [project?.id]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (!fullscreen && !mobile) videoRef.current.play().catch(() => {});
    else videoRef.current.pause();
  }, [fullscreen, mobile, project, videoFailed]);

  if (!project?.videoUrl || mobile) return null;
  const hidden = fullscreen;
  return <>
    <div className="editorial-thumb-bounds" ref={boundsRef} aria-hidden="true" />
    <motion.aside className="editorial-thumb" aria-label={`Preview de ${project.title}`}
      inert={hidden ? "" : undefined} aria-hidden={hidden || undefined}
      style={{ x, y, visibility: hidden ? "hidden" : "visible",
        top: `calc(${initialTop.current}% - 4svh)` }}
      drag dragListener={true} dragConstraints={boundsRef} dragElastic={0}
      onDragStart={() => document.documentElement.classList.add("is-dragging-preview")}
      onDragEnd={() => document.documentElement.classList.remove("is-dragging-preview")}>
      <span className="editorial-watch">WATCH FULL PROJECT</span>
      <button type="button" className="editorial-thumb-button" onPointerDownCapture={event => event.stopPropagation()}
        onClick={() => onOpen(project)} aria-label={`Watch full project: ${project.title}`}>
        <span className="editorial-thumb-poster" style={{ backgroundImage: `url("${project.main.image.sourceUrl}")` }} />
        {project.previewUrl && !videoFailed ? <video ref={videoRef} key={project.id} src={project.previewUrl}
          poster={project.main.image.sourceUrl} muted autoPlay loop playsInline preload="metadata"
          onLoadedData={event => event.currentTarget.classList.add("is-loaded")}
          onError={() => setVideoFailed(true)} /> : null}
      </button>
      <span className="editorial-thumb-title">{project.title}</span>
    </motion.aside>
  </>;
}
