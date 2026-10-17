# Isla Studio — Digital Botanica

A first working scaffold for the Isla Studio portfolio.

## Requirements
- Node.js and npm installed
- Internet connection for Google Fonts (the site still works with fallback fonts)

## Run locally
```bash
npm install
npm run dev
```
Open the local URL Vite prints in the terminal (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Included
- React + Vite + Tailwind CSS v4
- Responsive layout
- English / Uzbek language toggle with saved preference
- Day / night theme with saved preference
- About, Skills, TinyToons project, approach, contact and footer sections
- Reduced-motion support and keyboard focus styles
- Abstract flower illustration as a lightweight temporary stand-in for the eventual 3D model

## Before publishing
- Confirm the exact public display name you want to use.
- Replace or verify skill descriptions so they reflect your current experience.
- Add real TinyToons screenshots, demo link and repository link when available.
- Add the licensed, optimized `.glb` model and wire it into a Three.js scene.
- Consider using a contact form provider only if you need one; currently the email link opens the visitor's mail app.
- Test on mobile and run `npm run build`.

This is a starter version, not a final production release.
