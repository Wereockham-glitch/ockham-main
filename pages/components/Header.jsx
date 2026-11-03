import Link from "next/link";
import { useRouter } from "next/router";
import { usePageTransition } from "./PageTransition";
import { site } from "@/lib/site.mjs";

export default function Header({ fullscreen }) {
  const router = useRouter();
  const { handleLinkClick } = usePageTransition();
  const isAbout = router.pathname === "/about";
  return <header className={`editorial-header${isAbout ? " editorial-header--info" : ""}${router.pathname === "/daily" ? " editorial-header--daily" : ""}`} aria-hidden={fullscreen || undefined} inert={fullscreen ? "" : undefined}>
    <Link href="/" className={isAbout ? "editorial-close" : "editorial-brand"}
      aria-label={isAbout ? "Cerrar información y volver al inicio" : undefined}
      onClick={event => handleLinkClick(event, "/")}>
      {isAbout ? "X" : <>We’re <strong>{site.name}</strong>, a {site.descriptor}</>}
    </Link>
    <nav className="editorial-nav" aria-label="Navegación">
      <Link href="/about" aria-current={isAbout ? "page" : undefined} onClick={event => handleLinkClick(event, "/about")}>ABOUT</Link>
      <Link href="/daily" aria-current={router.pathname === "/daily" ? "page" : undefined} onClick={event => handleLinkClick(event, "/daily")}>DAILY</Link>
    </nav>
  </header>;
}
