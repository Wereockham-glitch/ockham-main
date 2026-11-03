import { useEffect, useRef, useState } from "react";
import Proyectos from "./Proyectos";

export default function InfinitePortfolio({ projects = [], fullscreen, onOpen, onActiveProject }) {
  const [mobile, setMobile] = useState(false);
  const [activeScene, setActiveScene] = useState("1:0");
  const containerRef = useRef(null);
  const scenes = useRef(new Map());
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
    let restoreSnap = 0;
    let positioned = false;
    let cycleHeight = 0;
    const jump = (top) => {
      viewport.style.scrollSnapType = "none";
      viewport.scrollTop = top;
      cancelAnimationFrame(restoreSnap);
      restoreSnap = requestAnimationFrame(() => { viewport.style.scrollSnapType = ""; });
    };
    const measure = () => {
      const first = scenes.current.get("0:0");
      const middle = scenes.current.get("1:0");
      if (!first || !middle) return;
      cycleHeight = middle.getBoundingClientRect().top - first.getBoundingClientRect().top;
      if (!positioned && cycleHeight > 0) {
        jump(viewport.scrollTop + middle.getBoundingClientRect().top - viewport.getBoundingClientRect().top);
        positioned = true;
      }
    };
    const update = () => {
      frame = 0;
      if (fullscreenRef.current || !positioned) return;
      if (cycleHeight > 0 && viewport.scrollTop < cycleHeight * 0.5) jump(viewport.scrollTop + cycleHeight);
      else if (cycleHeight > 0 && viewport.scrollTop > cycleHeight * 1.5) jump(viewport.scrollTop - cycleHeight);
      const viewportRect = viewport.getBoundingClientRect();
      let bestKey = "1:0";
      let bestArea = -1;
      scenes.current.forEach((scene, key) => {
        if (!scene) return;
        const rect = scene.getBoundingClientRect();
        const visible = Math.max(0, Math.min(rect.bottom, viewportRect.bottom) - Math.max(rect.top, viewportRect.top));
        if (visible > bestArea) { bestKey = key; bestArea = visible; }
      });
      setActiveScene(bestKey);
      onActiveProject(scenes.current.get(bestKey)?.dataset.projectId || projects[0]?.id || null);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(() => { measure(); schedule(); });
    resize.observe(container); resize.observe(viewport);
    measure(); update();
    viewport.addEventListener("scroll", schedule, { passive: true });
    return () => {
      resize.disconnect(); viewport.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame); cancelAnimationFrame(restoreSnap);
      viewport.style.scrollSnapType = "";
    };
  }, [mobile, projects, onActiveProject]);

  const setSceneRef = (key, element) => {
    if (element) scenes.current.set(key, element);
    else scenes.current.delete(key);
  };
  const shared = { mobile, fullscreen, activeScene, onOpen, setSceneRef };
  return <div ref={containerRef} className="editorial-portfolio" data-layout={mobile ? "mobile" : "desktop"}>
    {[0, 1, 2].map(cycle => <div key={cycle} data-infinite-cycle>
      <Proyectos {...shared} projects={projects} cycle={cycle} />
    </div>)}
  </div>;
}
