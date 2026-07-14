import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// On GitHub Pages the app is served from /<repo>/, locally from /.
// The deploy workflow sets BASE_PATH; everything else falls back to root.
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: "/atlas/",
  resolve: {
    alias: {
      "@domain": r("./src/domain"),
      "@data": r("./src/data"),
      "@i18n": r("./src/i18n"),
      "@ui": r("./src/ui"),
      "@services": r("./src/services"),
      "@state": r("./src/state"),
    },
  },
  build: {
    target: "es2022",
    cssTarget: "chrome100",
    // The atlas is one screen — a single chunk avoids a waterfall on load.
    modulePreload: { polyfill: false },
    reportCompressedSize: true,
  },
});
