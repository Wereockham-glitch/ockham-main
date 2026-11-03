import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { NextSeo } from "next-seo";
import { pageSeo, site } from "@/lib/site.mjs";
import AboutImage from "../public/img/about.jpg";

export default function About() {
  const trailRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const moveX = useSpring(x, { stiffness: 70, damping: 20, mass: 0.7 });
  const moveY = useSpring(y, { stiffness: 70, damping: 20, mass: 0.7 });
  const movePortrait = event => {
    if (event.pointerType === "touch" || !window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    x.set((event.clientX / window.innerWidth - 0.5) * 36);
    y.set((event.clientY / window.innerHeight - 0.5) * 28);
  };
  const resetPortrait = () => { x.set(0); y.set(0); };

  useEffect(() => {
    const trail = trailRef.current;
    const desktop = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lastPoint = null;

    const clearTrail = () => {
      lastPoint = null;
      trail.replaceChildren();
      if (!desktop.matches || reducedMotion.matches) { x.set(0); y.set(0); }
    };
    const onMove = event => {
      if (!desktop.matches || reducedMotion.matches) return;
      if (lastPoint && Math.hypot(event.clientX - lastPoint.x, event.clientY - lastPoint.y) < 120) return;
      lastPoint = { x: event.clientX, y: event.clientY };
      const image = document.createElement("img");
      image.src = AboutImage.src;
      image.alt = "";
      image.className = "editorial-about-trail-image";
      image.style.left = `${event.clientX}px`;
      image.style.top = `${event.clientY}px`;
      image.addEventListener("animationend", () => image.remove(), { once: true });
      trail.appendChild(image);
      if (trail.childElementCount > 14) trail.firstElementChild.remove();
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    desktop.addEventListener("change", clearTrail);
    reducedMotion.addEventListener("change", clearTrail);
    return () => {
      document.removeEventListener("mousemove", onMove);
      desktop.removeEventListener("change", clearTrail);
      reducedMotion.removeEventListener("change", clearTrail);
      clearTrail();
    };
  }, [x, y]);

  return <>
    <NextSeo {...pageSeo({ title: "About — LUAR | Lucas Couto & Cora Patiño", path: "/about" })} />
    <main className="editorial-about" onPointerMove={movePortrait} onPointerLeave={resetPortrait}>
      <div className="editorial-about-trail" ref={trailRef} aria-hidden="true" />
      <div className="editorial-about-stage">
        <motion.div className="editorial-about-image" style={{ x: moveX, y: moveY }}>
          <Image src={AboutImage} alt="Lucas Couto and Cora Patiño" priority sizes="(max-width: 767px) 52vw, 19vw" />
        </motion.div>
      </div>
      <div className="editorial-about-footer">
        <div className="editorial-about-copy">
          <p>We’re <strong>{site.name}</strong>, a {site.descriptor} based in Madrid, by Lucas Couto and Cora Patiño.</p>
          <p>Working across film and art direction, our practice combines visual precision with emotional intuition, creating images that feel both raw and carefully constructed.</p>
          <p>We develop commercial, narrative and art-driven projects, shaping visual worlds through direction, production design and creative development.</p>
        </div>
        <nav className="editorial-about-links" aria-label="Contacto y redes sociales">
          <a href="mailto:weareockham@gmail.com">MAIL</a>
          <a href="https://www.instagram.com/luar____luar/" target="_blank" rel="noreferrer">INSTAGRAM</a>
          <a href="https://vimeo.com/luarluar" target="_blank" rel="noreferrer">VIMEO</a>
        </nav>
      </div>
    </main>
  </>;
}
