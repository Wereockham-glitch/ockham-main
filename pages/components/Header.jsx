import Link from "next/link";

const Header = ({  setFullscreen }) => {
  return (
    <header className="uppercase flex justify-between fixed z-[70] top-0 w-full px-6 py-4 mix-blend-difference bg-black text-white">
      <div onClick={() => setFullscreen(false)}>
        <Link href="/">Ockham</Link>
      </div>
      <nav className="flex">
        <div onClick={() => setFullscreen(false)}>
          <Link className="mx-5" href="/about">
            About
          </Link>
        </div>
        <div onClick={() => setFullscreen(false)}>
          <a target={"_blank"} rel="noreferrer" href="mailto:weareockham@gmail.com">
            Mail
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
