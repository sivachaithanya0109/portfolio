# Template architecture

The application keeps route handling and saved preferences in `src/app`, template metadata and layouts in `src/templates`, shared UI in `src/components`, and portfolio content in `src/data`.

## Current structure

```text
src/
├── app/
│   ├── router/TemplateRouter.tsx
│   ├── providers/PortfolioPreferences.tsx
│   └── App.tsx
├── templates/
│   ├── registry.ts
│   ├── types.ts
│   ├── midnight/
│   ├── pastel/
│   ├── motion/
│   ├── automotive/
│   ├── mountain/
│   └── animated/
├── components/
│   ├── navigation/
│   ├── shared/
│   ├── template-switcher/
│   └── theme-switcher/
├── data/
├── hooks/
├── pages/
└── styles/
```

The current seven URLs (`/`, `/about`, `/skills`, `/projects`, `/experience`, `/resume`, and `/contact`) map to the corresponding section in the selected layout. Switching templates keeps the current URL; the selected layout scrolls the matching section into view. Unknown paths redirect to `/`.

## Registering a template

1. Add a unique ID to `templateIds` in `src/templates/types.ts`.
2. Create a layout component accepting `LayoutProps`. Use shared data and reusable behavior, while keeping the visual composition template-specific.
3. Add template-scoped style rules in `src/styles/templates.css`, using a unique root class such as `.new-template` and a `data-theme-mode` selector for dark mode.
4. Add a preview image under `public/templates/`.
5. Add a `TemplateDefinition` to `src/templates/registry.ts` with ID, name, description, preview image, layout component, supported theme modes, design tokens, and availability.
6. Add route and theme coverage to the integration tests.

`TemplateRouter` selects the registered layout from the preference context. The template selector is generated from `registeredTemplates` and appears as its own header button beside the separate theme button.

## Shared layout interface

Every template receives:

- `activePage`: the route-derived section ID.
- `theme`: the saved light or dark mode.
- `selectedTemplate` and registered template definitions.
- `onTemplateSelect` and `onThemeToggle` callbacks.

Templates can use `TemplateFrame`, `SectionNavigation`, `ContactForm`, and `SocialLinks` for common behavior. Those components do not dictate the section layouts or visual treatments.

## Shared data

`src/data/profile.ts`, `skills.ts`, `projects.ts`, and `experience.ts` are the source of truth. Template layouts read from these modules instead of maintaining separate copies. Route labels and paths live in `src/data/portfolio.ts`.

Project and social links should be replaced with verified destinations when available. The current project links are search links because direct repositories were not present in the supplied resume or application data.

## Theme and design tokens

`PortfolioPreferencesProvider` stores the theme in `localStorage` key `siva-theme` and the template ID independently in `siva-template`. Invalid template values safely resolve to `midnight-professional`. The existing theme key is preserved; selecting a layout never changes it.

Each template defines token metadata in the registry and concrete CSS custom properties on its root element. Light mode is the root default; `data-theme-mode="dark"` overrides the template's scoped variables. New token names should be prefixed by template (for example `--mc-*` or `--a-*`) to avoid coupling visual systems.

Template 01 is mounted by `MidnightLayout`, which retains the existing `Pages.tsx`, `SiteChrome.tsx`, and original `styles.css` presentation. The new stylesheet scopes rules to the other five template roots, except for shared selector and mobile navigation rules.

**Source checkout note:** the supplied checkout's original presentation uses a light pastel palette and the approved mockup-like panels; it does not contain a separate Midnight Professional implementation. It is kept visually unchanged and registered using the required `midnight-professional` ID. A genuinely distinct Midnight design cannot be introduced without changing that preserved source design or receiving its separate implementation/reference.

## Adding another template later

Create the new layout and CSS, register its ID and metadata, add a preview under `public/templates/`, and add tests for its routes, themes, selector state, and responsive layout. Do not copy portfolio content into the new template; import it from `src/data/`. The shared provider and selector do not require structural changes when a valid registry entry is added.

## Current form and asset behavior

The shared contact form performs browser validation, composes a `mailto:` URL, and reports that the email app is opening. It needs a backend or form service to deliver messages directly. Resume, portrait, and signature assets are served from `public/`.
