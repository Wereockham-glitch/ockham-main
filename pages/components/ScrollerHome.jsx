import { useRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";

const ScrollerHome = ({ height, children }) => {
  const scrollbarRef = useRef();

  const onScrollStopCallback = () => {
    if (!scrollbarRef.current) return;

    const lastScroll = scrollbarRef.current.getScrollTop();
    scrollbarRef.current.scrollTop(lastScroll);
  };

  return (
    <Scrollbars
      ref={scrollbarRef}
      onScrollStop={onScrollStopCallback}
      className="view isolate overflow-hidden bg-white"
      universal={true}
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
      {children}
    </Scrollbars>
  );
};

export default ScrollerHome;