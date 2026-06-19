# Soulbait

SEO-ready SolidStart marketing site for Soulbait, a seasonal Portland, Maine food truck.

## Stack

- SolidStart v2
- TypeScript
- Bun
- Static prerendering through the Nitro Vite plugin

## Commands

```bash
bun install
bun run dev
bun run check
bun run lint
bun run format:check
bun run build
bun run validate:html
bun run size
bun run audit:lighthouse
bun run verify
bun run preview
```

`bun run verify` is the local quality gate. It type-checks, lints, checks formatting, builds the
static site, validates generated HTML, enforces size budgets, and runs Lighthouse CI against the
five prerendered routes.

## Content Updates

Marketing copy, menu items, locations, CTA links, and seasonal details live in `src/content/site.ts`.
Update that file before changing page components.
