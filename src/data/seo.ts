import { matchPath } from "react-router-dom";
import { brand } from "./brand";
import { rooms } from "./rooms";

export interface PageMeta {
  title: string;
  description: string;
  /** Pages that should not appear in search results */
  noindex: boolean;
}

// Keep this text the same as the <meta name="description"> in index.html
export const SITE_DESCRIPTION = `${brand.name}, ${brand.slogan} in Mazzeh, Damascus. Discover refined rooms and suites, book your stay online and enjoy warm, personal hospitality.`;

const HOME_TITLE = `${brand.name} | ${brand.slogan}`;

function pageTitle(name: string): string {
  return `${name} | ${brand.name}`;
}

// Search results show about 160 characters of a description
function truncate(text: string, max = 160): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

function isPath(pattern: string, pathname: string, end = true): boolean {
  return matchPath({ path: pattern, end }, pathname) !== null;
}

const notFoundMeta: PageMeta = {
  title: pageTitle("Page Not Found"),
  description: `The page you are looking for doesn't exist. Return to the ${brand.name} home page or browse our rooms.`,
  noindex: true,
};

// Title, description and indexing rule for every route of the site.
// This is the single place to edit SEO text per page.
//
// About "noindex":
// - /login, /register, /about and the 404 page stay crawlable (robots.txt does
//   not block them), so crawlers can read their noindex. It is added by
//   JavaScript, so it is read only after the page is rendered.
// - /admin, /dashboard and /booking* are blocked in public/robots.txt, so
//   crawlers do not visit them and never read their noindex. It stays there as
//   a backup (and without a login they only show the /login page anyway).
// Neither rule guarantees that a page will never appear in search results.
export function getPageMeta(pathname: string): PageMeta {
  if (isPath("/", pathname)) {
    return { title: HOME_TITLE, description: SITE_DESCRIPTION, noindex: false };
  }

  if (isPath("/rooms", pathname)) {
    return {
      title: pageTitle("Rooms & Suites"),
      description: `Browse the rooms and suites at ${brand.name} in Mazzeh, Damascus. Compare sizes, beds and nightly rates, then book your stay online.`,
      noindex: false,
    };
  }

  const roomMatch = matchPath("/rooms/:id", pathname);
  if (roomMatch) {
    const room = rooms.find((item) => String(item.id) === roomMatch.params.id);
    if (!room) return notFoundMeta;

    // No price here: the prices in src/data/rooms.ts are still sample data
    const guests = `${room.guests} ${room.guests === 1 ? "guest" : "guests"}`;
    return {
      title: pageTitle(room.name),
      description: truncate(
        `${room.description} ${room.size} m², up to ${guests}, ${room.bed}. Book your stay at ${brand.name}.`,
      ),
      noindex: false,
    };
  }

  if (isPath("/contact", pathname)) {
    return {
      title: pageTitle("Contact"),
      description: `Call or write to ${brand.name} in Mazzeh, Damascus. We are happy to help with rooms, rates and reservations.`,
      noindex: false,
    };
  }

  // The About page is still a temporary placeholder: keep it out of search
  // results until it has real content (then set noindex to false).
  if (isPath("/about", pathname)) {
    return {
      title: pageTitle("About"),
      description: SITE_DESCRIPTION,
      noindex: true,
    };
  }

  if (isPath("/login", pathname)) {
    return {
      title: pageTitle("Login"),
      description: `Sign in to your ${brand.name} account to manage your stays.`,
      noindex: true,
    };
  }

  if (isPath("/register", pathname)) {
    return {
      title: pageTitle("Create Account"),
      description: `Create a ${brand.name} account to book your stay.`,
      noindex: true,
    };
  }

  if (isPath("/booking", pathname) || isPath("/booking-success", pathname)) {
    return {
      title: pageTitle("Book Your Stay"),
      description: `Book your stay at ${brand.name}.`,
      noindex: true,
    };
  }

  if (isPath("/dashboard", pathname, false)) {
    return {
      title: pageTitle("My Account"),
      description: `Your bookings and account at ${brand.name}.`,
      noindex: true,
    };
  }

  if (isPath("/admin", pathname, false)) {
    return {
      title: pageTitle("Admin"),
      description: `${brand.name} administration.`,
      noindex: true,
    };
  }

  return notFoundMeta;
}