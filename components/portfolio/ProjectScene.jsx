import Media from "./Media";

const mobilePositions = [[12.5, 17], [45, 3], [77, 31], [31, 44], [59, 57], [85, 72], [7, 81]];

export default function ProjectScene({ project, mobile, active, cycle, priority, onOpen, onNext, sceneRef }) {
  const { composition } = project;
  const stills = mobile ? project.mosaic.map((item, i) => [i, ...mobilePositions[i % mobilePositions.length], 10.5]) : composition.stills;
  return <article ref={sceneRef} className={`editorial-project editorial-project--${project.key} ${mobile ? "is-mobile" : ""}`}
    data-project-id={project.id} data-cycle={cycle} aria-label={project.title}>
    <div className="editorial-stills" aria-label={`Stills de ${project.title}`}>
      {stills.map(([index, x, y, width]) => {
        const item = project.mosaic[index];
        if (!item) return null;
        return <figure key={index} className="editorial-still" style={{ left: `${x}%`, top: `${y}%`, width: `${width}%` }}>
          <span className="editorial-index">{item.index}</span>
          <button type="button" onClick={() => onOpen(project)} aria-label={`Ver ${project.title}, imagen ${item.index}`} disabled={!project.videoUrl}>
            <Media image={item.image} active={active} sizes={mobile ? "11vw" : `${width}vw`} />
          </button>
        </figure>;
      })}
    </div>
    <figure className="editorial-main" style={{ "--main-x": `${composition.main[0]}%`, "--main-y": `${composition.main[1]}%`, "--main-width": `${composition.main[2]}%` }}>
      <button type="button" onClick={() => onOpen(project)} aria-label={`Ver ${project.title}`} disabled={!project.videoUrl}>
        <Media image={project.main.image} video={mobile ? project.main.videoMobile : project.main.videoDesktop}
          active={active} priority={priority} sizes="(max-width: 767px) 70vw, 30vw" alt={project.title} />
      </button>
      <figcaption className="editorial-credits" dangerouslySetInnerHTML={{ __html: project.credits }} />
    </figure>
    <button className="editorial-next" onClick={onNext} aria-label="Siguiente proyecto" type="button">
      <svg aria-hidden="true" viewBox="0 0 12 52"><path d="M6 1v48M2.5 45.5 6 49l3.5-3.5" /></svg>
    </button>
  </article>;
}
