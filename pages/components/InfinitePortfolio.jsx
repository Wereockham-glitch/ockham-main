import Proyectos from "./Proyectos";

const InfinitePortfolio = ({
  listadoProyectos,
  fullscreen,
  setFullscreen,
  setFullscreenUrl,
}) => {
  return (
  <>
    <div data-infinite-cycle>
      <Proyectos
        listadoProyectos={listadoProyectos}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        setFullscreenUrl={setFullscreenUrl}
      />
    </div>

    <div data-infinite-cycle>
           <Proyectos
        listadoProyectos={listadoProyectos}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        setFullscreenUrl={setFullscreenUrl}
      />
    </div>
  </>
);
};

export default InfinitePortfolio;
