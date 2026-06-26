import Link from "next/link";
import { useRouter } from "next/router";

const Header = ({ setFullscreen }) => {
  const router = useRouter();
  const isAbout = router.pathname === "/about";

  return (
    <header className="flex justify-between fixed z-[70] top-0 w-full px-6 py-4 mix-blend-difference bg-black text-white">
      <div onClick={() => setFullscreen?.(false)}>
        <Link href="/">
          {isAbout ? (
            <span className="font-bold">OCKHAM</span>
          ) : (
            <>
              We’re <span className="font-bold">OCKHAM</span>, a directing duo
            </>
          )}
        </Link>
      </div>

      <nav className="flex text-[13px] tracking-tight">
        <div onClick={() => setFullscreen?.(false)}>
          <Link className="mx-5" href="/about">
            about
          </Link>
        </div>

        <div onClick={() => setFullscreen?.(false)}>
          <Link href="/daily">daily</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;