import { useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import Header from "./Header";
import CustomCursor from "./CustomCursor";

const Scroller = ({ height, fullscreen, setFullscreen, children }) => {
  
  const onScroll = (e) => {
    // console.log(e.target.scrollTop, e.target.scrollHeight - window.innerHeight);
    if (e.target.scrollTop >= e.target.scrollHeight - window.innerHeight - 20) {
      // console.log('bottom',)
      e.target.scrollTop = 0;
    }
  };
  const scrollbarRef = useRef()

  return (
    <Scrollbars
      className="view isolate overflow-hidden bg-white"
      universal={true}
      onScroll={(e) => onScroll(e)}
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
