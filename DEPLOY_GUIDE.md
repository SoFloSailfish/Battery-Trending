# GitHub Setup — Step by Step

A guide for getting Battery Trending live on GitHub Pages.

**What makes this project different from a plain static site:** the files you
push are *source code*, not the finished website. GitHub runs a build step
(via GitHub Actions) that turns the source into the actual site, then publishes
it. So the Pages source is set to **GitHub Actions**, not "deploy from a branch."
That's the main thing that differs from a simple HTML repo.

You do **not** need Node.js or to run any build commands on your own computer —
GitHub does the build in the cloud. (You only need Node locally if you want to
preview changes before pushing, which is optional.)

---

## Step 0 — Before you start

Prep the files on your computer:

1. Unzip / gather the `battery-app` folder so it contains everything:
   `index.html`, `package.json`, `vite.config.js`, `src/`, `public/`,
   `.github/`, `README.md`, etc.
2. **Rename `gitignore.txt` to `.gitignore`** (the leading dot matters — Git
   looks for that exact name). On Windows, if it won't let you start a name
   with a dot, name it `.gitignore.` with a trailing dot and it'll fix itself,
   or rename it from a terminal: `ren gitignore.txt .gitignore`.
3. Do **not** include a `node_modules` or `dist` folder if one exists — the
   `.gitignore` already excludes them, but don't add them manually.

Double-check the folder structure looks like this:

```
battery-app/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── favicon.svg
│   ├── logo.png
│   └── icons/
│       ├── icon-192.png
│       ├── icon-512.png
│       └── icon-512-maskable.png
└── src/
    ├── BatteryTrending.jsx
    ├── main.jsx
    └── index.css
```

The `.github/workflows/deploy.yml` file is what tells GitHub to build and
publish automatically. If that folder is missing, the auto-deploy won't run.

---

## Step 1 — Create the repository on GitHub

1. On GitHub, click **New repository**.
2. Name it (e.g. `battery-trending`).
3. Public or private both work — GitHub Pages works with either on current
   plans. (If your org restricts Pages on private repos, use public.)
4. **Do not** check "Add a README" / "Add .gitignore" / "Add license" — you
   already have those files, and adding them here creates conflicts.
5. Click **Create repository**. Leave that page open; you'll use the URL.

---

## Step 2 — Push the project

From a terminal, inside the `battery-app` folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<YOU>/<REPO>.git
git push -u origin main
```

Replace `<YOU>/<REPO>` with your username and repo name (the exact URL is shown
on the repo page from Step 1).

If you'd rather not use the command line, you can instead use **GitHub Desktop**
or drag-and-drop upload — but the command line above is the most reliable for
getting the hidden `.github` and `.gitignore` files uploaded. (Web drag-and-drop
sometimes skips dot-folders like `.github`, which would break the auto-deploy.)

After pushing, refresh the repo page — you should see all your files, including
the `.github` folder.

---

## Step 3 — Turn on GitHub Pages (the key step)

This is the part that's different from a static-file repo.

1. In the repo, go to **Settings** (top nav) → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, select **GitHub Actions**.
   - NOT "Deploy from a branch." That option serves raw files and would just
     show your source code, not the built app.
3. That's it — there's nothing to save; selecting the source is enough.

---

## Step 4 — Let the build run

1. Go to the **Actions** tab of the repo.
2. You should see a workflow run called **"Deploy to GitHub Pages"** already
   running (it triggered on your push). If it's not there, see Troubleshooting.
3. Wait for it to finish — about 1–2 minutes. Green check = success.
   - It runs two jobs: **build** (compiles the app) then **deploy** (publishes).
4. When it's done, go back to **Settings → Pages**. Near the top it shows:
   **"Your site is live at https://<you>.github.io/<repo>/"** with a **Visit
   site** button.

Open that URL — the app should load with your logo.

---

## Step 5 — Confirm it works, then install it

1. On the live URL, confirm the app loads, sites show, and dark mode is on.
2. **Install it on a field laptop (Chrome or Edge):** open the site, then click
   the install icon in the address bar (a small monitor/⊕ icon), or the ⋯ menu →
   **Apps → Install this site as an app**. It gets its own window and a
   Start-menu / taskbar icon.
3. **Test offline:** with the app installed and having loaded once online, turn
   off WiFi and relaunch it. It should open normally. (First load must be
   online so it can cache itself — after that, offline works.)

---

## Making updates later

Any time you change a file and push it:

```bash
git add .
git commit -m "describe the change"
git push
```

GitHub automatically rebuilds and republishes within a couple of minutes. Field
laptops pick up the new version the next time they launch the installed app
while online — no reinstall needed.

**Adding your data note:** the app itself holds data in memory and Saves/Loads a
JSON file. Deploying a new version of the *app* does not touch anyone's saved
data files — those live wherever you saved them.

---

## Troubleshooting

**The Actions tab shows no workflow / nothing ran.**
The `.github/workflows/deploy.yml` file didn't get uploaded (common with web
drag-and-drop, which skips dot-folders). Push again from the command line, or
manually create the file on GitHub in that exact path.

**The workflow failed (red X).**
Click the failed run → the failed job → read the last red lines. Most common
cause is a missing file or a typo introduced while editing. The build works
as-is from the delivered files, so if you haven't changed code, re-running the
job (top-right "Re-run jobs") often clears a transient hiccup.

**Site loads but shows a blank page or "404" for the JS/CSS.**
This is a path issue. The project is set with `base: "./"` in `vite.config.js`
specifically to avoid this on Pages — confirm that line is present and you
didn't change it. Do a hard refresh (Ctrl+Shift+R) to clear cached files.

**Site shows my source code / a file list instead of the app.**
The Pages source is set to "Deploy from a branch" instead of "GitHub Actions."
Go back to Step 3 and switch it.

**Old version keeps showing after an update.**
The service worker caches aggressively for offline use. Close and reopen the
app/tab; it updates on next launch. To force it immediately, hard-refresh
(Ctrl+Shift+R) or, in the browser's dev tools → Application → Service Workers,
click "Update" then reload.

**"Install" option doesn't appear.**
It only appears once the site is served over HTTPS (GitHub Pages always is) and
has loaded once. Give it a few seconds after first load, or check you're in
Chrome/Edge (Firefox handles PWA install differently).
