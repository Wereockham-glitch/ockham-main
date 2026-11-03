import { useEffect } from "react";
import { useRouter } from "next/router";
import Scrollbars from "react-custom-scrollbars-2";
import Header from "./Header";

const Scroller = ({ height, fullscreen, setFullscreen, children }) => {
  const { pathname } = useRouter();

  useEffect(() => {
    if (pathname !== "/") {
      const viewport = document.querySelector(".home-scroll-viewport");
      if (viewport) viewport.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <Scrollbars
      className="view isolate overflow-hidden bg-white"
      universal={true}
      hideTracksWhenNotNeeded={true}
      renderTrackHorizontal={(props) => (
        <div {...props} className="track-horizontal" />
      )}
      renderThumbVertical={(props) => (
        <div {...props} className="thumb-vertical bg-yellow-400 z-50" />
      )}
      renderView={(props) => (
        <div
          {...props}
          className={`home-scroll-viewport overflow-x-hidden-important bg-white ${fullscreen ? "is-player-open" : ""}`}
        />
      )}
      style={{ height: height }}
    >
      <Header setFullscreen={setFullscreen} fullscreen={fullscreen} />
      {children}
    </Scrollbars>
  );
};

export default Scroller;
