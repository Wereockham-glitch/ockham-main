import { useRef, forwardRef } from "react";
import { mergeRefs } from "react-merge-refs";

import { use100vh } from "react-div-100vh";
import Scroller from "./Scroller";

const Layout = forwardRef(({fullscreen,setFullscreen, children, ...props }, ref) => {
  const height = use100vh();
  const h = height ? height : "calc(100vh)";
  const localRef = useRef();
  return (
    <div ref={mergeRefs([ref, localRef])}>
      <Scroller  setFullscreen={setFullscreen} fullscreen={fullscreen} height={h}>
       
        {children}
   
      </Scroller>
    </div>
  );
});
Layout.displayName = "Layout";

export default Layout;
