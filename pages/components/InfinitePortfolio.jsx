import { memo, useEffect, useState } from "react";
import Proyectos from "./Proyectos";

const InfinitePortfolio = ({
  listadoProyectos,
  fullscreen,
  setFullscreen,
  setFullscreenUrl,
  setActiveThumb,
  setThumbs,
}) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateLayout = () => setIsDesktop(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);

    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  if (!isDesktop) {
    return (
      <div className="home-mobile-portfolio">
        <Proyectos
          key="mobile-portfolio"
          variant="mobileEditorial"
          listadoProyectos={listadoProyectos}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
          setFullscreenUrl={setFullscreenUrl}
          setActiveThumb={setActiveThumb}
          setThumbs={setThumbs}
        />
      </div>
    );
  }

  return (
  <>
    <div className="home-portfolio-cycle" data-cycle="0" data-infinite-cycle>
      <Proyectos
        variant="desktop"
        cycle={0}
        listadoProyectos={listadoProyectos}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        setFullscreenUrl={setFullscreenUrl}
        setActiveThumb={setActiveThumb}
        setThumbs={setThumbs}
      />
    </div>

    <div className="home-portfolio-cycle" data-cycle="1" data-infinite-cycle>
           <Proyectos
        variant="desktop"
        cycle={1}
        listadoProyectos={listadoProyectos}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        setFullscreenUrl={setFullscreenUrl}
        setActiveThumb={setActiveThumb}
        setThumbs={setThumbs}
      />
    </div>
  </>
);
};

export default memo(InfinitePortfolio);
