import { portfolioConfig } from "../data/portfolio-config.mjs";

const imageForBrowser = image => image?.sourceUrl ? {
  sourceUrl: image.sourceUrl,
  altText: image.altText || "",
  mediaDetails: {
    width: image.mediaDetails?.width || 800,
    height: image.mediaDetails?.height || 450,
  },
} : null;

export function selectPortfolioProjects(source, config = portfolioConfig) {
  const byId = new Map((source || []).map(project => [project.id, project]));
  return config.filter(entry => entry.visible).flatMap(entry => {
    const project = byId.get(entry.id);
    if (!project || project.status !== "publish" || project.isPreview || project.isRestricted) return [];
    const content = project.contenidoProyecto || {};
    const slides = content.sliderYCrDitos?.slider || content.collage?.slider || [];
    const main = slides.find(slide => slide.image?.sourceUrl);
    if (!main) return [];
    const mosaic = (content.mosaico || []).filter(item => item.image?.sourceUrl).map(item => ({
      index: item.index,
      image: imageForBrowser(item.image),
    }));
    return [{
      id: project.id, slug: project.slug, key: entry.key, title: entry.title, category: entry.category,
      main: {
        image: imageForBrowser(main.image),
        videoDesktop: main.videoDesktop || null,
        videoMobile: main.videoMobile || null,
      },
      mosaic, composition: { main: entry.main, stills: entry.stills, previewTop: entry.previewTop },
      videoUrl: content.videoOrigen || main.videoOrigen || null,
      previewUrl: content.videoThumbnail || null,
      credits: content.sliderYCrDitos?.credits || content.collage?.credits || "",
      description: entry.description || "", team: entry.team || null,
    }];
  });
}

export function filterPortfolio(projects, category) {
  return (projects || []).filter(project => project.category === category);
}
