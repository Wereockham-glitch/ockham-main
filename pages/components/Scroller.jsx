import { useRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import Header from "./Header";

const Scroller = ({ height, fullscreen, setFullscreen, children }) => {
  const isJumping = useRef(false);

  const handleScroll = (event) => {
    if (isJumping.current) return;

    const view = event.target;
    const cycles = view.querySelectorAll("[data-infinite-cycle]");
    const [firstCycle, secondCycle] = cycles;

    if (!firstCycle || !secondCycle) return;

    const cycleHeight = firstCycle.offsetHeight;
    const loopStart = view.scrollTop + secondCycle.getBoundingClientRect().top - view.getBoundingClientRect().top;

    if (cycleHeight > 0 && loopStart > 0 && view.scrollTop >= loopStart) {
      isJumping.current = true;
      view.scrollTop = view.scrollTop - cycleHeight;

      requestAnimationFrame(() => {
        isJumping.current = false;
      });
    }
  };

  return (
    <Scrollbars
      onScroll={handleScroll}
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
