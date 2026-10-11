// Single source of truth for the hotel's name, slogan, contact details and
// links. Change a value here and it updates everywhere it is used.

// Logo file: put it in src/assets/images/branding/ and name it
// flamingo-logo.svg (flamingo-logo.png or flamingo-logo.webp also work).
// Until the file exists the logo is simply not shown.
const logoModules = import.meta.glob<string>(
  "../assets/images/branding/flamingo-logo.{svg,png,webp}",
  { eager: true, import: "default" },
);
const logoUrl: string | undefined = Object.values(logoModules)[0];

const PHONE = "0980753417";
const EMAIL = "abdalrhmanalmallah3@gmail.com";

interface Brand {
  name: string;
  slogan: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  instagramUrl: string;
  facebookUrl: string;
  /**
   * Link opened by the location box on the Home page (a map or the hotel's
   * website). Empty until a real link is set: the box then stays a plain
   * placeholder.
   */
  locationUrl: string;
  /** The logo image URL, or undefined while the logo file is missing */
  logo: string | undefined;
}

export const brand: Brand = {
  name: "Golden Mazzeh",
  slogan: "a flamingo hotel",
  phone: PHONE,
  phoneHref: `tel:${PHONE}`,
  email: EMAIL,
  emailHref: `mailto:${EMAIL}`,
  instagramUrl:
    "https://www.instagram.com/abod_mallah?stkn=bXFjaHhzcGo2Nzlr&utm_source=qr",
  facebookUrl:
    "https://www.facebook.com/abd.alrhman.almallah.2025?mibextid=wwXIfr&mibextid=wwXIfr",
  locationUrl: "https://maps.app.goo.gl/1xnu89CUDjjvMr26A?g_st=ic",
  logo: logoUrl,
};