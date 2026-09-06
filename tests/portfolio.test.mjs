import assert from "node:assert/strict";
import test from "node:test";
import { filterPortfolio, selectPortfolioProjects } from "../lib/portfolio.mjs";

const media = index => ({
  index: String(index).padStart(2, "0"),
  image: { sourceUrl: `https://example.test/${index}.jpg`, mediaDetails: { width: 1600, height: 900 } },
});

const sourceProject = (id, overrides = {}) => ({
  id,
  slug: `project-${id}`,
  status: "publish",
  isPreview: false,
  isRestricted: false,
  contenidoProyecto: {
    mosaico: [media(1), media(2)],
    sliderYCrDitos: { slider: [media(3)], credits: "Verified credits" },
    videoOrigen: "https://vimeo.com/123",
    videoThumbnail: "https://example.test/preview.mp4",
  },
  ...overrides,
});

const config = [
  { id: "one", key: "one", title: "One", category: "campaigns", visible: true, main: [1, 2, 3], stills: [], previewTop: 4 },
  { id: "two", key: "two", title: "Two", category: "campaigns", visible: true, main: [1, 2, 3], stills: [], previewTop: 4 },
  { id: "short", key: "short", title: "Hidden short", category: "short", visible: false, main: [1, 2, 3], stills: [], previewTop: 4 },
];

test("selects only allowlisted, published and visible projects in editorial order", () => {
  const result = selectPortfolioProjects([
    sourceProject("unknown"),
    sourceProject("two"),
    sourceProject("one"),
    sourceProject("short"),
  ], config);
  assert.deepEqual(result.map(project => project.id), ["one", "two"]);
  assert.equal(result.some(project => project.id === "unknown" || project.id === "short"), false);
});

test("rejects drafts, previews, restricted entries and projects without a main image", () => {
  const noMain = sourceProject("one", { contenidoProyecto: { sliderYCrDitos: { slider: [] } } });
  assert.equal(selectPortfolioProjects([sourceProject("one", { status: "draft" })], config).length, 0);
  assert.equal(selectPortfolioProjects([sourceProject("one", { isPreview: true })], config).length, 0);
  assert.equal(selectPortfolioProjects([sourceProject("one", { isRestricted: true })], config).length, 0);
  assert.equal(selectPortfolioProjects([noMain], config).length, 0);
});

test("filtering covers empty, one-project and multi-project categories", () => {
  const projects = [
    { id: "a", category: "campaigns" },
    { id: "b", category: "campaigns" },
    { id: "c", category: "short" },
  ];
  assert.deepEqual(filterPortfolio(projects, "missing"), []);
  assert.deepEqual(filterPortfolio(projects, "short").map(project => project.id), ["c"]);
  assert.deepEqual(filterPortfolio(projects, "campaigns").map(project => project.id), ["a", "b"]);
});
