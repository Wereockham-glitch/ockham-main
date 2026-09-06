import { useEffect, useRef, useState } from "react";
import Proyectos from "./Proyectos";

export default function InfinitePortfolio({ projects = [], fullscreen, onOpen, onActiveProject }) {
  const [mobile, setMobile] = useState(false);
  const [activeScene, setActiveScene] = useState("0:0");
  const containerRef = useRef(null);
  const scenes = useRef(new Map());
  const bridgeRef = useRef(null);
  const spacerRef = useRef(null);
  const fullscreenRef = useRef(fullscreen);
  fullscreenRef.current = fullscreen;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const viewport = container?.closest(".home-scroll-viewport");
    if (!viewport) return;
    let frame = 0;
    let cycleHeight = 0;
    viewport.scrollTop = 0;
    const measure = () => {
      const first = scenes.current.get("0:0");
      if (mobile && first && bridgeRef.current) {
        cycleHeight = bridgeRef.current.getBoundingClientRect().top - first.getBoundingClientRect().top;
        spacerRef.current.style.height = `${viewport.clientHeight}px`;
      }
    };
    const update = () => {
      frame = 0;
      if (fullscreenRef.current) return;
      const viewportRect = viewport.getBoundingClientRect();
      if (mobile && cycleHeight > 0 && bridgeRef.current.getBoundingClientRect().top <= viewportRect.top) {
        viewport.scrollTop -= cycleHeight;
      }
      let bestKey = "0:0";
      let bestArea = -1;
      scenes.current.forEach((scene, key) => {
        if (!scene) return;
        const rect = scene.getBoundingClientRect();
        const visible = Math.max(0, Math.min(rect.bottom, viewportRect.bottom) - Math.max(rect.top, viewportRect.top));
        const distance = Math.min(Math.abs((rect.top + rect.height / 2) - (viewportRect.top + viewportRect.height / 2)) / viewportRect.height, 1);
        scene.style.setProperty("--scene-veil", fullscreenRef.current ? "0" : (distance * 0.42).toFixed(3));
        if (visible > bestArea) { bestKey = key; bestArea = visible; }
      });
      setActiveScene(bestKey);
      const scene = scenes.current.get(bestKey);
      onActiveProject(scene?.dataset.projectId || projects[0]?.id || null);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(() => { measure(); schedule(); });
    resize.observe(container);
    resize.observe(viewport);
    measure(); update();
    viewport.addEventListener("scroll", schedule, { passive: true });
    return () => { resize.disconnect(); viewport.removeEventListener("scroll", schedule); cancelAnimationFrame(frame); };
  }, [mobile, projects, onActiveProject]);

  const next = key => {
    const viewport = containerRef.current?.closest(".home-scroll-viewport");
    const entries = [...scenes.current.entries()].filter(([, node]) => node);
    const index = entries.findIndex(([entryKey]) => entryKey === key);
    const target = entries[index + 1]?.[1] || entries[0]?.[1];
    if (!viewport || !target) return;
    const top = viewport.scrollTop + target.getBoundingClientRect().top - viewport.getBoundingClientRect().top;
    viewport.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  const setSceneRef = (key, element) => {
    if (element) scenes.current.set(key, element);
    else scenes.current.delete(key);
  };
  const shared = { mobile, fullscreen, activeScene, onOpen, onNext: next, setSceneRef };

  return <div ref={containerRef} className="editorial-portfolio" data-layout={mobile ? "mobile" : "desktop"}>
    <div data-infinite-cycle={mobile ? undefined : ""}>
      <Proyectos {...shared} projects={projects} cycle={0} />
    </div>
    {projects.length > 0 && (mobile ? <>
      <div ref={bridgeRef} data-mobile-loop-bridge>
        <Proyectos {...shared} projects={projects.slice(0, 1)} cycle={1} />
      </div>
      <div ref={spacerRef} aria-hidden="true" />
    </> : <div data-infinite-cycle="">
      <Proyectos {...shared} projects={projects} cycle={1} />
    </div>)}
  </div>;
}
