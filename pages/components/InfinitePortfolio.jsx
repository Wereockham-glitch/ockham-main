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
    <div data-infinite-cycle>
      <Proyectos
        listadoProyectos={listadoProyectos}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        setFullscreenUrl={setFullscreenUrl}
        setActiveThumb={setActiveThumb}
        setThumbs={setThumbs}
      />
    </div>

    <div data-infinite-cycle>
           <Proyectos
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

export default InfinitePortfolio;
