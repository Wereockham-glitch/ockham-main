import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Header = ({ setFullscreen }) => {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);

  const isAbout = router.pathname === "/about";
  const isDaily = router.pathname === "/daily";

  const goToAbout = () => {
    setShowOverlay(true);

    setTimeout(() => {
      router.push("/about");
    }, 1500);
  };

  return (
    <>
      {/* Global transition overlay */}
      <div
        className={`fixed inset-0 z-[99999] pointer-events-none backdrop-blur-xl transition-all duration-[1500ms] ${
          showOverlay ? "opacity-100 bg-white" : "opacity-0 bg-white"
        }`}
      />

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
          {/* ABOUT */}
          <div>
            {isAbout ? (
              <Link className="mx-5 font-bold" href="/about">
                about
              </Link>
            ) : (
              <button
                onClick={goToAbout}
                className="mx-5 cursor-pointer"
              >
                about
              </button>
            )}
          </div>

          {/* DAILY */}
          <div onClick={() => setFullscreen?.(false)}>
            <Link className={isDaily ? "font-bold" : ""} href="/daily">
              daily
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;