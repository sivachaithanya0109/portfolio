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
npm run test:ci
npm run test:e2e
```

There is no separate lint command configured in this repository. The production build runs TypeScript project checks before Vite bundles the application.

Playwright tests live in `e2e/`. The suite covers shared portfolio content and local images, responsive section navigation, resume and project links, contact-form validation, template and theme behavior, and mobile navigation. HTML reports are written to `playwright-report/`; failure artifacts are written to `test-results/`. Both output folders are ignored by Git.

The application root is the existing `siva_portfolio/` folder in the repository. Its `src/`, `public/`, `e2e/`, `playwright.config.ts`, and `package.json` already follow the requested layout, so no folder moves are needed.

## Deploy to Cloudflare Pages

The GitHub Actions workflow at `.github/workflows/deploy-cloudflare-pages.yml` runs unit and Playwright tests, builds the portfolio, then deploys `dist/` to the Cloudflare Pages project `siva-portfolio` when changes are pushed to `master`. It can also be started manually from the repository's Actions tab. The Playwright HTML report and test artifacts are uploaded even when a test fails.

Before deploying, create a Cloudflare Pages project named `siva-portfolio` and add these repository Actions secrets under **Settings → Secrets and variables → Actions**:

- `CLOUDFLARE_API_TOKEN` — a Cloudflare API token with permission to deploy Pages.
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID.

Do not commit these values or share the API token in chat. The workflow checks that both secrets are present before deployment.

## Templates

Template registration, visual tokens, routing behavior, preference storage, and instructions for adding a template are documented in [docs/TEMPLATES.md](docs/TEMPLATES.md). See [docs/IMAGE-CREDITS.md](docs/IMAGE-CREDITS.md) for the mountain and automotive photograph sources.

The existing portfolio remains the default and is mounted through `src/templates/midnight/MidnightLayout.tsx`; its presentation styles remain in the original `src/styles.css`. New template styles live in `src/styles/templates.css` and are scoped to each template root.

## Shared portfolio data

Edit `src/data/profile.ts`, `skills.ts`, `projects.ts`, and `experience.ts` to update portfolio content. The resume, portrait, and signature files are served from `public/`. The contact form validates its fields and opens the user's email app with a prepared message; it does not send through a server.
