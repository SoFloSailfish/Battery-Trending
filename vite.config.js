import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// For GitHub Pages, base "./" keeps asset paths relative so the site works
// whether it's served from a domain root or a /<repo-name>/ subpath.
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    VitePWA({
      // Auto-update: when a field laptop reconnects and a new version has been
      // pushed, the service worker fetches it in the background and swaps it in
      // on the next launch. No prompts, no manual steps — simplest + reliable.
      registerType: "autoUpdate",
      injectRegister: "auto",

      // Precache everything the app needs so it opens fully offline after the
      // first load. The app is self-contained (no runtime network calls), so
      // caching the built assets is all that's required.
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff,woff2}"],
        // recharts makes the JS bundle large; raise the precache size ceiling.
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: "index.html",
        cleanupOutdatedCaches: true,
      },

      includeAssets: ["favicon.svg"],

      manifest: {
        name: "Battery Trending",
        short_name: "Battery Trending",
        description:
          "Standby battery conductance tracking and trending.",
        theme_color: "#0d2029",
        background_color: "#0e1519",
        display: "standalone",
        start_url: "./",
        scope: "./",
        icons: [
          { src: "./icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "./icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "./icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      },

      // Let `npm run dev` also register the service worker so you can test
      // offline behavior locally before deploying.
      devOptions: { enabled: true },
    }),
  ],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
