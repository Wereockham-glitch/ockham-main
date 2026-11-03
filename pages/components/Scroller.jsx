import Scrollbars from "react-custom-scrollbars-2";
import Header from "./Header";

const Scroller = ({ height, fullscreen, setFullscreen, children }) => {
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
