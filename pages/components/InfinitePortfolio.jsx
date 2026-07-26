import Proyectos from "./Proyectos";

const InfinitePortfolio = ({
  listadoProyectos,
  fullscreen,
  setFullscreen,
}) => {
  return (
  <>
    <div data-infinite-cycle>
      <Proyectos
        listadoProyectos={listadoProyectos}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
      />
    </div>

    <div data-infinite-cycle>
           <Proyectos
        listadoProyectos={listadoProyectos}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
      />
    </div>
  </>
);
};

export default InfinitePortfolio;
