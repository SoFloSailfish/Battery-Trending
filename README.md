# Battery Trending — Lee County ITG

Standby battery conductance tracking and trending for Lee County ITG UPS sites.
Imports Midtronics Celltron test CSVs, tracks per-jar and per-string health over
time, flags weak jars and replacement-due strings, and estimates runtime.

Built with React + Vite. Runs entirely in the browser — no server, no database.
Data lives in a JSON file you Save/Load; test results come in via CSV import.

---

## Running locally

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install      # first time only
npm run dev      # start dev server, opens http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

---

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds and deploys automatically on every push to `main`.

**One-time setup:**

1. Create a new repository on GitHub and push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `main` (or re-run the workflow). The site publishes at
   `https://<you>.github.io/<repo>/`.

After that, every push to `main` rebuilds and redeploys the site.

---

## Works offline + installable (PWA)

This app is a Progressive Web App. After it loads once with a connection, a
service worker caches everything, so it **opens fully offline every time
after that** — which is what you want for field testing with no network.

**Install it as a desktop app (Chrome / Edge):** open the site, then click the
install icon in the address bar (or the ⋯ menu → *Install / Apps → Install this
site as an app*). It gets its own window and a Start-menu / taskbar icon and
launches offline like a native app. You can also just use it as a normal browser
tab — that works offline too once cached.

**Updates:** when you push a new version and a field laptop later reconnects, the
service worker fetches the update in the background and swaps it in on the next
launch. No prompts, no manual steps.

> First run must be online (to cache the app). After that, offline works.

## Adding your logo

The header shows a placeholder battery icon until you add a logo.

- **Header logo:** drop a file named **`logo.svg`** (or `logo.png`) into the
  **`public/`** folder. It appears automatically in the header — no code changes.
  Square works best (it sits in a 34×34 rounded tile); SVG is sharpest.
- **Browser-tab icon:** overwrite **`public/favicon.svg`**.
- **Install / app icons:** replace the three PNGs in **`public/icons/`**
  (`icon-192.png`, `icon-512.png`, `icon-512-maskable.png`). Keep the same
  filenames and sizes. The maskable one should keep its important content within
  the center ~80% (safe zone), since some launchers crop the edges.

Commit and push; the deploy workflow rebuilds and picks it all up.

---

## How the data works

- **Import test** — load a Celltron CSV export. The app auto-matches each site
  by name, splits multi-string sites, dedupes by test date (so re-importing an
  overlapping export won't duplicate tests), and keeps the latest reading on a
  same-day retest.
- **Save / Load** — the app holds data in memory; Save writes it to a JSON file,
  Load reads it back. Keep that file somewhere shared (network drive, OneDrive).
- **Site setup** — edit a site's name, battery details, string count, and
  reference conductance (including per-string references).

Health tiers: ≥90% Healthy · 80–89% OK · 70–79% Monitor · 60–69% Plan
replacement · <60% Replace now. Any single jar at/under 60% flags the string.

---

## Project structure

```
public/            static assets (favicon, your logo)
src/
  BatteryTrending.jsx   the whole app (component + styles + seed data)
  main.jsx              React entry point
  index.css             global reset
index.html           HTML shell
vite.config.js       build config (base: "./" for Pages)
.github/workflows/   auto-deploy to GitHub Pages
```
