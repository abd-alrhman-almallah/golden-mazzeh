import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMeta } from "../../data/seo";

type MetaAttribute = "name" | "property";

// Updates the tag that already exists in index.html (or creates it once),
// so the page never ends up with duplicate description tags.
function setMeta(attribute: MetaAttribute, key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function removeMeta(attribute: MetaAttribute, key: string): void {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove();
}

// Mounted once (src/main.tsx). On every route change it sets the page title,
// the description and the indexing rule from src/data/seo.ts.
function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname);

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);

    // Only "noindex" (links on the page can still be followed)
    if (meta.noindex) {
      setMeta("name", "robots", "noindex");
    } else {
      removeMeta("name", "robots");
    }
  }, [pathname]);

  return null;
}

export default RouteMeta;