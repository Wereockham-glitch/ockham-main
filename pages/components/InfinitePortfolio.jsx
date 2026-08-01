import { memo } from "react";
import Proyectos from "./Proyectos";

const InfinitePortfolio = ({
  listadoProyectos,
  fullscreen,
  setFullscreen,
  setFullscreenUrl,
  setActiveThumb,
  setThumbs,
}) => {
  return (
  <>
    <div className="home-portfolio-cycle" data-cycle="0" data-infinite-cycle>
      <Proyectos
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
