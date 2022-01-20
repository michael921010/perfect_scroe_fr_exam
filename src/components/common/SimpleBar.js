import "simplebar/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import { useRef, useEffect } from "react";

export default function _SimpleBar({ onScroll, children, ...props }) {
  const scrollBar = useRef(null);

  useEffect(() => {
    const scrollEl = scrollBar.current.getScrollElement();
    scrollEl.onScroll = onScroll;
    scrollEl.onscroll = onScroll;
    scrollEl.scroll = onScroll;
    return () => {
      scrollEl.removeEventListener("onScroll", onScroll);
      scrollEl.removeEventListener("onscroll", onScroll);
      scrollEl.removeEventListener("scroll", onScroll);
    };
  }, [scrollBar, onScroll]);

  return (
    <SimpleBar ref={scrollBar} {...props}>
      {children}
    </SimpleBar>
  );
}

_SimpleBar.defaultProps = {
  onScroll: () => {},
};
