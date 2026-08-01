import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const PageTransitionContext = createContext(null);

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error("usePageTransition must be used within PageTransition");
  }

  return context;
};

const PageTransition = ({ children }) => {
  const router = useRouter();
  const [phase, setPhase] = useState("idle");
  const phaseRef = useRef("idle");
  const destinationRef = useRef(null);
  const navigationFrameRef = useRef(null);

  const updatePhase = useCallback((nextPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  const prefersReducedMotion = useCallback(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const navigate = useCallback(
    (href) => {
      if (!href || href === router.asPath || phaseRef.current !== "idle") {
        return;
      }

      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }

      destinationRef.current = href;
      updatePhase("exiting");
    },
    [prefersReducedMotion, router, updatePhase]
  );

  const handleLinkClick = useCallback(
    (event, href) => {
      const link = event.currentTarget;
      const isModifiedClick =
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey;

      if (
        event.defaultPrevented ||
        isModifiedClick ||
        link.target === "_blank" ||
        link.hasAttribute("download")
      ) {
        return;
      }

      const destination = new URL(href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      event.preventDefault();
      navigate(`${destination.pathname}${destination.search}${destination.hash}`);
    },
    [navigate]
  );

  const handleTransitionEnd = useCallback(
    (event) => {
      if (event.propertyName !== "opacity") return;

      if (phaseRef.current === "exiting" && destinationRef.current) {
        const destination = destinationRef.current;
        updatePhase("covered");
        navigationFrameRef.current = requestAnimationFrame(() => {
          router.push(destination).catch(() => updatePhase("entering"));
        });
        return;
      }

      if (phaseRef.current === "entering") {
        destinationRef.current = null;
        updatePhase("idle");
      }
    },
    [router, updatePhase]
  );

  useEffect(() => {
    const revealPage = () => {
      if (destinationRef.current) updatePhase("entering");
    };

    router.events.on("routeChangeComplete", revealPage);
    router.events.on("routeChangeError", revealPage);

    return () => {
      router.events.off("routeChangeComplete", revealPage);
      router.events.off("routeChangeError", revealPage);
      if (navigationFrameRef.current) {
        cancelAnimationFrame(navigationFrameRef.current);
      }
    };
  }, [router.events, updatePhase]);

  return (
    <PageTransitionContext.Provider value={{ navigate, handleLinkClick }}>
      {children}
      <div
        aria-hidden="true"
        className={`page-transition-overlay page-transition-overlay--${phase}`}
        onTransitionEnd={handleTransitionEnd}
      />
    </PageTransitionContext.Provider>
  );
};

export default PageTransition;
