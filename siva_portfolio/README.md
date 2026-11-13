# Siva Portfolio

A responsive React + TypeScript portfolio built with Vite, Tailwind CSS, React Router, Motion, and Lucide icons.

## Start the app

```sh
npm install
npm run dev
```

## Build and checks

```sh
npm run build
npm test -- --run
npm run test:e2e
```

## Update your content

Edit `src/data/portfolio.ts` to update navigation labels, skill lists, project cards, and timeline entries. Replace placeholder social profile URLs and email in `src/pages/Pages.tsx`. Add a real profile photo to `public/` and replace the illustrated placeholder in `HomePage` when one is ready. Add a resume PDF to `public/` before enabling its download. The contact form currently validates in the browser and displays a local status message; connect a service before expecting messages to be delivered.

The theme toggle stores the selected light/dark theme in local storage. Motion animations respect reduced-motion preferences.
