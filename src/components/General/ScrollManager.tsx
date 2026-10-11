import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Scrolls on navigation:
// - to the element for a #hash link (for example /#hotel)
// - otherwise to the top of the page (not on browser back/forward, so the
//   browser can keep the previous scroll position)
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
        return;
      }
    }

    if (navigationType === "POP") return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, navigationType]);

  return null;
}

export default ScrollManager;