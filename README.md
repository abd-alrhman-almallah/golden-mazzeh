# Golden Mazzeh — a flamingo hotel

A responsive hotel booking website for a single boutique hotel in Mazzeh, Damascus. It covers the full guest journey, from browsing rooms to a confirmed booking, plus a user dashboard and an admin area.

> **Frontend demo.** This project runs entirely in the browser. There is **no backend and no database**: sign-in and bookings are simulated and stored in the browser's local storage. Do not enter real personal data.

## Features

**Public website**
- Home page with a hero, a booking search bar that pre-fills the booking form, featured rooms, experiences, guest reviews (sample content) and an embedded Google Map.
- Rooms listing and room details pages for 9 room types, each with a two-photo gallery.
- Contact page with phone (`tel:`), email (`mailto:`) and social links.
- Custom "Page not found" page.

**Booking flow**
- Select a room, dates, guests and number of rooms, with form validation and clear error messages.
- Live availability check: overlapping dates are rejected, pending and confirmed bookings block a room, and a stay may start on the day another one ends.
- Total price = nightly rate × rooms × nights, shown in a live summary.
- Confirmation page, then the booking appears in the user's dashboard.

**Accounts**
- Register, login and logout (simulated) with "Remember me" support.
- Protected routes that redirect to login and return the user to the page they wanted.
- User dashboard: overview and statistics, My Bookings, booking details, profile and settings.

**Admin area**
- Dashboard statistics, rooms with their current status, all bookings and all guests (including users registered in the app).
- Action buttons (edit, delete, cancel, add) are UI only and show an informational message.

**Quality and polish**
- Responsive layout for desktop, tablet and mobile.
- Toast notifications and accessible modal dialogs (for example, a sign-out confirmation).
- Loading, error and empty states.
- Per-route page title, description and `noindex` rules, plus `robots.txt`.
- Real WebP images and automatic scroll handling on navigation.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI | React 19, TypeScript |
| Build tool | Vite |
| Routing | React Router 7 |
| State | Zustand (authentication state) |
| Styling | Plain CSS, scoped to each component |
| Linting | ESLint with typescript-eslint and React Hooks rules |
| CI | GitHub Actions |

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/) 24 (the version used for development and in CI)
- npm (installed with Node.js)

### Installation

```bash
git clone https://github.com/abd-alrhman-almallah/golden-mazzeh.git
cd golden-mazzeh
npm ci
```

`npm ci` installs the exact versions from `package-lock.json`. You can use `npm install` instead.

### Run locally

```bash
npm run dev
```

Then open the address printed in the terminal (Vite's default is `http://localhost:5173`).

### Demo account

The app ships with a demo account built from sample data:

- Email: `sarah.mitchell@example.com`
- Password: `Welcome123`

You can also create your own account on the Register page. Accounts and bookings are saved only in your browser.

## Available Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run lint` | Runs ESLint on the project |
| `npm run build` | Type-checks with `tsc -b`, then creates the production build in `dist/` |
| `npm run preview` | Serves the production build locally (run `npm run build` first) |

There is no automated test suite yet; the project has been checked manually.

## Continuous Integration

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push to `main` and on every pull request. It sets up Node.js 24, installs dependencies with `npm ci`, then runs `npm run lint` and `npm run build`. Results are visible in the **Actions** tab of the repository.

There is currently **no automatic deployment** configured.

## Project Structure

```
.
├── .github/workflows/   # CI workflow
├── public/              # Static files (robots.txt, favicon)
├── src/
│   ├── assets/images/   # WebP photos
│   ├── components/      # UI building blocks (Admin, Auth, Booking, Dashboard, General, Home, Navigation, Rooms, RoomDetails)
│   ├── data/            # Rooms, brand details, SEO rules and sample data
│   ├── layouts/         # Site, dashboard and admin layouts
│   ├── pages/           # One folder per page
│   ├── services/        # Data access (bookings, availability, authentication)
│   ├── store/           # Zustand stores
│   ├── types/           # TypeScript types
│   └── utils/           # Helpers
├── index.html
├── package.json
└── vite.config.ts
```

## Design System

| Role | Color |
| --- | --- |
| Primary | `#04364F` |
| Secondary | `#601E34` |
| Background | `#FDFDFD` |
| Light background | `#EFEFF2` |
| Secondary text | `#93979A` |

Headings use Georgia and body text uses the system font stack, so no web fonts are loaded.

## Current Limitations

- **No backend or database.** Users, sessions and bookings live in the browser's local storage, so data is per browser and is lost if it is cleared.
- **Authentication is a simulation.** Passwords are hashed in the browser only. This is not real security and must not be used with real accounts.
- **The admin area has no roles.** Any signed-in user can open the admin pages, and its action buttons do not change data.
- **Availability treats each room type as a single unit** (there is no room inventory), and new bookings stay in "Pending" status.
- **Sample content:** room descriptions and prices, the guest review, the nearby attractions list and the demo guests are placeholders. The About page is a temporary placeholder, and the Terms and Privacy pages do not exist yet.
- **Search engine limits:** this is a client-side React app. Search engines that do not run JavaScript, and social link previews, see only the static tags in `index.html`. Canonical URL, sitemap and a social preview image are not set up yet.

## Roadmap

- Real backend and database with proper authentication and roles.
- Working admin management for rooms and bookings.
- Room inventory and booking confirmation flow.
- Payments and email notifications.
- About, Terms and Privacy content.
- Automated tests.
- Public deployment and automatic deployment from GitHub.