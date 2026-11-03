import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { pageSeo, site } from "@/lib/site.mjs";
import AboutImage from "../public/img/about.jpg";
import { usePageTransition } from "./components/PageTransition";

export default function About() {
  const { handleLinkClick } = usePageTransition();

  return (
    <>
      <NextSeo {...pageSeo({ title: "About — LUAR | Lucas Couto & Cora Patiño", path: "/about" })} />
      <div className="editorial-about bg-white min-h-screen px-[14px] md:px-6 pt-[21px] pb-8 flex flex-col">
        {/* Texto */}
       {/* Texto */}
<div className="editorial-about-copy font-condensed tracking-[-0.025em]">
  <Link
    href="/"
    onClick={(event) => handleLinkClick(event, "/")}
    className="block cursor-pointer hover:opacity-60 transition-opacity duration-500"
  >
    <div className="space-y-1">
      <p>
        <span className="md:hidden">
          <span className="block whitespace-nowrap">
            We’re <strong>{site.name}</strong>, a {site.descriptor}
          </span>
          <span className="block whitespace-nowrap">based in Madrid,</span>
          <span className="block whitespace-nowrap">
            by Lucas Couto and Cora Patiño.
          </span>
        </span>
        <span className="hidden md:inline">
          We’re <strong>{site.name}</strong>, a {site.descriptor} based in Madrid, by
          Lucas Couto and Cora Patiño.
        </span>
      </p>

      <p>
        Working across film and art direction, our practice combines visual
        precision with emotional intuition, creating images that feel both raw
        and carefully constructed.
      </p>

      <p>
        We develop commercial, narrative and art-driven projects, shaping visual
        worlds through direction, production design and creative development.
      </p>
    </div>
  </Link>
</div>

        {/* Imagen */}
        <div className="editorial-about-image mt-8 w-[205px] md:w-auto">
          <Image
            src={AboutImage}
            alt="Lucas and Cora"
            className="w-full max-w-[420px] h-auto"
            priority
          />
        </div>

        {/* Footer */}
        <div className="editorial-about-footer mt-auto pt-16 flex justify-between items-end font-condensed">
          <div>
            <a href="mailto:weareockham@gmail.com">mail</a>
          </div>

          <div className="flex flex-col items-end gap-0.5">
            <a
              href="https://vimeo.com/luarluar"
              target="_blank"
              rel="noreferrer"
            >
              vimeo
            </a>

            <a
              href="https://www.instagram.com/luar____luar/"
              target="_blank"
              rel="noreferrer"
            >
              @luar____luar
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
