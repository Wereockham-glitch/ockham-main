import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePageTransition } from "./PageTransition";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Fullscreen({ project, fullscreen, onClose }) {
  const [showInfo, setShowInfo] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const infoRef = useRef(null);
  const { handleLinkClick } = usePageTransition();

  useEffect(() => {
    if (!fullscreen || !project) return;
    setShowInfo(false); setReady(false); setFailed(false);
    const previousFocus = document.activeElement;
    const viewport = document.querySelector(".home-scroll-viewport");
    const scrollTop = viewport?.scrollTop || 0;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = event => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key !== "Tab") return;
      const elements = [...dialogRef.current.querySelectorAll("button, a[href], iframe")]
        .filter(element => element.getClientRects().length > 0 && !element.disabled);
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (viewport) viewport.scrollTop = scrollTop;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [fullscreen, project, onClose]);

  if (!fullscreen || !project) return null;
  const ratio = project.main.image.mediaDetails.width / project.main.image.mediaDetails.height;
  const toggleInfo = () => { setShowInfo(value => !value); if (infoRef.current) infoRef.current.scrollTop = 0; };
  return <section ref={dialogRef} className="editorial-player" role="dialog" aria-modal="true" aria-label={`Reproductor: ${project.title}`}>
    <div className="editorial-player-header">
      <button type="button" onClick={onClose}>We’re <strong>OCKHAM</strong>, a directing duo</button>
      <nav aria-label="Navegación del reproductor">
        <Link href="/about" onClick={event => { onClose(); handleLinkClick(event, "/about"); }}>about</Link>
        <Link href="/daily" onClick={event => { onClose(); handleLinkClick(event, "/daily"); }}>daily</Link>
        <button type="button" ref={closeRef} onClick={onClose} aria-label="Cerrar reproductor">CLOSE ×</button>
      </nav>
    </div>
    <div className="editorial-player-stage" style={{ display: showInfo ? "none" : undefined }}>
      {!ready && !failed && <span className="editorial-loading" role="status">Just a sec.</span>}
      {failed ? <p className="editorial-video-error">El vídeo no se ha podido cargar. <a href={project.videoUrl} target="_blank" rel="noreferrer">Ver en Vimeo ↗</a></p> :
        <div className="editorial-film" style={{ "--film-ratio": ratio }}>
          <ReactPlayer key={project.id} url={project.videoUrl} width="100%" height="100%"
            playing={!showInfo} controls playsinline onReady={() => setReady(true)}
            onError={() => setFailed(true)} config={{ vimeo: { playerOptions: { title: false, byline: false, portrait: false } } }} />
        </div>}
    </div>
    {showInfo && <div className="editorial-info" ref={infoRef} id="project-info">
      <div className="editorial-description">
        <h1>{project.title}</h1>
        {project.description && <p>{project.description}</p>}
      </div>
      <div className="editorial-team">
        {project.team ? project.team.map((group, index) => <div key={index}>{group.role && <h2>{group.role}</h2>}<p>{group.names}</p></div>) :
          <div dangerouslySetInnerHTML={{ __html: project.credits }} />}
      </div>
    </div>}
    <button className="editorial-info-toggle" type="button" onClick={toggleInfo} aria-expanded={showInfo} aria-controls={showInfo ? "project-info" : undefined}>
      {showInfo ? "−INFO / BACK TO FILM" : "+INFO"}
    </button>
  </section>;
}
