import { useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import Header from "./Header";
import CustomCursor from "./CustomCursor";

const Scroller = ({ height, fullscreen, setFullscreen, children }) => {
  const scrollbarRef = useRef();

  return (
    <Scrollbars
      ref={scrollbarRef}
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
        <div {...props} className="overflow-x-hidden-important bg-white" />
      )}
      style={{ height: height }}
    >
      <Header setFullscreen={setFullscreen} fullscreen={fullscreen} />
      {children}
      {/* <CustomCursor /> */}
    </Scrollbars>
  );
};

export default Scroller;