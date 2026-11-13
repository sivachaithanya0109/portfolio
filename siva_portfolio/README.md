# Siva Portfolio

An existing React + TypeScript portfolio built with Vite. The application supports six selectable visual templates while sharing profile content, routes, theme preference, and contact behavior.

## Run locally

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

There is no separate lint command configured in this repository. The production build runs TypeScript project checks before Vite bundles the application.

## Templates

Template registration, visual tokens, routing behavior, preference storage, and instructions for adding a template are documented in [docs/TEMPLATES.md](docs/TEMPLATES.md). See [docs/IMAGE-CREDITS.md](docs/IMAGE-CREDITS.md) for the mountain and automotive photograph sources.

The existing portfolio remains the default and is mounted through `src/templates/midnight/MidnightLayout.tsx`; its presentation styles remain in the original `src/styles.css`. New template styles live in `src/styles/templates.css` and are scoped to each template root.

## Shared portfolio data

Edit `src/data/profile.ts`, `skills.ts`, `projects.ts`, and `experience.ts` to update portfolio content. The resume, portrait, and signature files are served from `public/`. The contact form validates its fields and opens the user's email app with a prepared message; it does not send through a server.
