import { brand } from "../../data/brand";

interface BrandLogoProps {
  /** "light" for light backgrounds, "dark" for the dark blue backgrounds */
  tone?: "light" | "dark";
  size?: "md" | "sm";
  /** Show the slogan under the name */
  showSlogan?: boolean;
}

const styles = `
.gh-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-align: left;
}
.gh-brand__logo {
  display: block;
  flex-shrink: 0;
  width: auto;
  height: 40px;
}
.gh-brand__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.gh-brand__name {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  white-space: nowrap;
}
.gh-brand__slogan {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 12px;
  font-style: italic;
  line-height: 1;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.gh-brand--light .gh-brand__name {
  color: #04364F;
}
.gh-brand--light .gh-brand__name span {
  color: #601E34;
}
.gh-brand--light .gh-brand__slogan {
  color: #93979A;
}
.gh-brand--dark .gh-brand__name {
  color: #FDFDFD;
}
.gh-brand--dark .gh-brand__name span {
  color: #93979A;
}
.gh-brand--dark .gh-brand__slogan {
  color: #EFEFF2;
}
.gh-brand--sm {
  gap: 8px;
}
.gh-brand--sm .gh-brand__logo {
  height: 28px;
}
.gh-brand--sm .gh-brand__name {
  font-size: 14px;
  letter-spacing: 0.14em;
}
.gh-brand--sm .gh-brand__slogan {
  font-size: 11px;
}

/* Very small phones: a slightly smaller wordmark so it always fits */
@media (max-width: 480px) {
  .gh-brand:not(.gh-brand--sm) {
    gap: 8px;
  }
  .gh-brand:not(.gh-brand--sm) .gh-brand__logo {
    height: 32px;
  }
  .gh-brand:not(.gh-brand--sm) .gh-brand__name {
    font-size: 16px;
    letter-spacing: 0.14em;
  }
}
`;

// The hotel's name (and logo when the logo file exists). It has no link of its
// own: wrap it in a <Link> where it should be clickable.
function BrandLogo({
  tone = "light",
  size = "md",
  showSlogan = false,
}: BrandLogoProps) {
  const [firstWord, ...otherWords] = brand.name.split(" ");
  const restOfName = otherWords.join(" ");

  const className = [
    "gh-brand",
    `gh-brand--${tone}`,
    size === "sm" ? "gh-brand--sm" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <style>{styles}</style>
      <span className={className}>
        {brand.logo && (
          <img
            className="gh-brand__logo"
            src={brand.logo}
            alt=""
            aria-hidden="true"
          />
        )}
        <span className="gh-brand__text">
          <span className="gh-brand__name">
            {firstWord}
            {restOfName && (
              <>
                {" "}
                <span>{restOfName}</span>
              </>
            )}
          </span>
          {showSlogan && <span className="gh-brand__slogan">{brand.slogan}</span>}
        </span>
      </span>
    </>
  );
}

export default BrandLogo;