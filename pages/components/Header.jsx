import Link from "next/link";
import { useRouter } from "next/router";

const Header = ({ setFullscreen }) => {
  const router = useRouter();
  const isAbout = router.pathname === "/about";
  const isDaily = router.pathname === "/daily";

  return (
    <header className="flex justify-between fixed z-[70] top-0 w-full px-6 py-4 mix-blend-difference bg-black text-white pointer-events-none">
      
      {/* Left side */}
      <div
        className={`text-[13px] md:text-[17px] ${
          isAbout ? "pointer-events-none opacity-0" : ""
        }`}
        onClick={() => setFullscreen?.(false)}
      >
        {!isAbout && (
          <Link href="/">
            <>
              We’re <span className="font-bold">OCKHAM</span>, a directing duo
            </>
          </Link>
        )}
      </div>

      {/* Right side */}
      <nav className="flex text-[13px] tracking-tight pointer-events-auto">
        <div onClick={() => setFullscreen?.(false)}>
          <Link
            className={`mx-5 ${isAbout ? "font-bold" : ""}`}
            href="/about"
          >
            about
          </Link>
        </div>

        <div onClick={() => setFullscreen?.(false)}>
          <Link className={isDaily ? "font-bold" : ""} href="/daily">
            daily
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;