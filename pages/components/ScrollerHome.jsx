import { useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

const ScrollerHome = ({ height, children }) => {
  const scrollbarRef = useRef();
  const [showOverlay, setShowOverlay] = useState(false);
  const isTransitioning = useRef(false);

  const onScroll = (e) => {
    if (isTransitioning.current) return;

    const scrollTop = e.target.scrollTop;
    const totalHeight = e.target.scrollHeight;
    const halfHeight = totalHeight / 2;

    if (scrollTop >= halfHeight) {
      isTransitioning.current = true;
      setShowOverlay(true);

      setTimeout(() => {
        e.target.scrollTop = scrollTop - halfHeight;
      }, 250);

      setTimeout(() => {
        setShowOverlay(false);
        isTransitioning.current = false;
      }, 700);
    }
  };

  const onScrollStopCallback = () => {
    if (!scrollbarRef.current) return;

    const lastScroll = scrollbarRef.current.getScrollTop();
    scrollbarRef.current.scrollTop(lastScroll);
  };

  return (
    <div className="relative">
      {/* Overlay transition */}
      <div
        className={`fixed inset-0 z-[99999] pointer-events-none backdrop-blur-md transition-all duration-700 ${
          showOverlay ? "opacity-100 bg-white/70" : "opacity-0 bg-white/0"
        }`}
      />

      <Scrollbars
        ref={scrollbarRef}
        onScrollStop={onScrollStopCallback}
        className="view isolate overflow-hidden bg-white"
        universal={true}
        onScroll={onScroll}
        hideTracksWhenNotNeeded={true}
        renderTrackHorizontal={(props) => (
          <div {...props} className="track-horizontal" />
        )}
        renderTrackVertical={(props) => (
          <div {...props} className="track-vertical" />
        )}
        renderThumbHorizontal={(props) => (
          <div {...props} className="thumb-horizontal" />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className="thumb-vertical" />
        )}
        renderView={(props) => (
          <div {...props} className="overflow-x-hidden-important" />
        )}
        style={{ height }}
      >
        <>
          {children}
          {children}
        </>
      </Scrollbars>
    </div>
  );
};

export default ScrollerHome;