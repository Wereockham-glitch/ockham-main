// Shared identity for the visible copy, search results and link previews.
const descriptor = "director duo";

export const site = {
  name: "LUAR",
  descriptor,
  origin: "https://luar.work",
  title: "LUAR — Director Duo | Lucas Couto & Cora Patiño",
  description: `We’re LUAR, a ${descriptor} based in Madrid. Lucas Couto and Cora Patiño work across film, commercials and visual storytelling.`,
  socialProfiles: [
    "https://www.instagram.com/luar____luar/",
    "https://vimeo.com/luarluar",
  ],
};

export const portraitPreview = {
  url: `${site.origin}/img/about.jpg`,
  width: 1600,
  height: 1067,
  alt: "Lucas Couto and Cora Patiño — LUAR",
  type: "image/jpeg",
};

export function pageSeo({ title = site.title, description = site.description, path = "/", image = portraitPreview } = {}) {
  const url = `${site.origin}${path}`;
  return {
    title,
    description,
    canonical: url,
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      images: [image],
    },
    twitter: { cardType: "summary_large_image" },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.origin}/#organization`,
  name: site.name,
  alternateName: "OCKHAM",
  url: `${site.origin}/`,
  logo: `${site.origin}/favicon-ockham.png`,
  image: portraitPreview.url,
  description: site.description,
  sameAs: site.socialProfiles,
  founder: [
    { "@type": "Person", name: "Lucas Couto" },
    { "@type": "Person", name: "Cora Patiño" },
  ],
};
