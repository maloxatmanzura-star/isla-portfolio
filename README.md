# Isla Studio: portfolio of Erkinova Malohat

React + Vite + Tailwind v4 + Motion, with a lazy-loaded Three.js (React Three Fiber) flower.

## Commands
```bash
npm install        # install dependencies
npm run dev        # local development
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Deploy
`dist/` is a static site. `vite.config.js` uses `base: "./"`, so it works on Vercel, Netlify and GitHub Pages without extra configuration. There is no client-side router, so no rewrite rules are needed.

## Structure
- `src/profile.js`: confirmed public facts (name, email, GitHub). Edit here only.
- `src/content/en.js`, `uz.js`: all user-facing text. To add a language, copy `en.js`, translate it, register it in `src/i18n.jsx`.
- `src/components/`: Nav, Hero, Flower (loader + SVG fallback), Flower3D, Sections, ProjectCard, Botanicals.
- `src/index.css`: design tokens (Day Garden / Moon Garden) and all styling.

## Adding a project
Add an object to `more.items` in each language file (`title`, `status`, `description`, `stack`, and `links: [{href, label}]` only for real URLs). The empty-state "next bed" disappears automatically.

## 3D flower and assets
The flower is generated in code from Three.js geometry (no GLB file, no external model, so no third-party license). It falls back to an SVG illustration while loading, on reduced motion, with no WebGL, on low-memory/low-core devices, or on error.

## Status of this build
Written without network access: dependencies were not installed and nothing was built, run or visually checked. See the delivery notes for what to verify first.
