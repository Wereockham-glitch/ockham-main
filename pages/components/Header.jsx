import Link from "next/link";
import { useRouter } from "next/router";
import { usePageTransition } from "./PageTransition";

const Header = ({ setFullscreen }) => {
  const router = useRouter();
  const { handleLinkClick } = usePageTransition();

  const isAbout = router.pathname === "/about";
  const isDaily = router.pathname === "/daily";

  return (
    <>
      <header
        className={`flex justify-between fixed z-[70] top-0 w-full py-4 md:px-6 mix-blend-difference bg-black text-white pointer-events-none ${
          isAbout ? "px-6" : "px-3"
        }`}
      >
        {/* Left side */}
        <div
  className={`pointer-events-auto text-[13px] md:text-[15px] md:leading-[1.2] ${
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
        <nav className="flex text-[13px] tracking-tight pointer-events-auto">
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
