import Link from "next/link";
import { useRouter } from "next/router";
import { usePageTransition } from "./PageTransition";
import { usePortfolio } from "../../components/portfolio/PortfolioContext";

const Header = ({ setFullscreen, fullscreen }) => {
  const router = useRouter();
  const { handleLinkClick } = usePageTransition();

  const isAbout = router.pathname === "/about";
  const isDaily = router.pathname === "/daily";
  const { category, setCategory } = usePortfolio();

  if (router.pathname === "/") return <header className="editorial-header" aria-hidden={fullscreen || undefined} inert={fullscreen ? "" : undefined}>
    <Link href="/" className="editorial-brand" onClick={event => handleLinkClick(event, "/")}>
      We’re <strong>OCKHAM</strong>, a directing duo
    </Link>
    <nav className="editorial-filters" aria-label="Tipo de proyecto">
      <span aria-hidden="true">—</span>
      {["short", "campaigns"].map(value => <button type="button" key={value} aria-pressed={category === value}
        onClick={() => setCategory(value)}>{value.toUpperCase()}</button>)}
    </nav>
    <nav className="editorial-nav" aria-label="Navegación">
      <Link href="/about" onClick={event => handleLinkClick(event, "/about")}>about</Link>
      <Link href="/daily" onClick={event => handleLinkClick(event, "/daily")}>daily</Link>
    </nav>
  </header>;

  if (isAbout) return <header className="editorial-header editorial-header--about">
    <nav className="editorial-nav" aria-label="Navegación">
      <Link className="font-bold" href="/about">about</Link>
      <Link href="/daily" onClick={event => handleLinkClick(event, "/daily")}>daily</Link>
    </nav>
  </header>;

  return (
    <>
      <header
        className="flex justify-between fixed z-[70] top-0 w-full py-4 px-[14px] md:px-6 mix-blend-difference bg-black text-white pointer-events-none"
      >
        {/* Left side */}
        <div
  className={`pointer-events-auto text-[13px] leading-[1.2] ${
    isAbout ? "pointer-events-none opacity-0" : ""
  }`}
  onClick={() => setFullscreen?.(false)}
>
  {!isAbout && (
    <Link
      href="/"
      className="cursor-pointer"
      onClick={(event) => handleLinkClick(event, "/")}
    >
      We’re <span className="font-bold">OCKHAM</span>, a directing duo
    </Link>
  )}
</div>

        {/* Right side */}
        <nav className="flex text-[11px] tracking-tight pointer-events-auto">
          {/* ABOUT */}
          <div>
            {isAbout ? (
              <Link className="mx-5 font-bold" href="/about">
                about
              </Link>
            ) : (
              <Link
                href="/about"
                onClick={(event) => handleLinkClick(event, "/about")}
                className="mx-5 cursor-pointer"
              >
                about
              </Link>
            )}
          </div>

          {/* DAILY */}
          <div onClick={() => setFullscreen?.(false)}>
            <Link
              className={isDaily ? "font-bold" : ""}
              href="/daily"
              onClick={(event) => handleLinkClick(event, "/daily")}
            >
              daily
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
