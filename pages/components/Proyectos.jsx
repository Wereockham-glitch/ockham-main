import ProjectScene from "../../components/portfolio/ProjectScene";

export default function Proyectos({ projects = [], mobile, cycle, activeScene, fullscreen, onOpen, setSceneRef }) {
  return <div className="editorial-project-list">
    {projects.map((project, index) => <ProjectScene key={project.id}
      project={project} mobile={mobile} cycle={cycle}
      active={!fullscreen && activeScene === `${cycle}:${index}`}
      priority={cycle === 1 && index === 0} onOpen={onOpen}
      sceneRef={element => setSceneRef(`${cycle}:${index}`, element)} />)}
  </div>;
}
