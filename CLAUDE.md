# Range Documentation (Starlight)

Astro Starlight docs for Range by Turbine - on-chain signature verification for Solana. Deployed to Cloudflare Pages.

## Tech Stack

- **Framework**: Astro + Starlight
- **Plugins**: @pasqal-io/starlight-client-mermaid (diagrams)
- **Deploy**: Cloudflare Pages (static)
- **Styling**: Custom CSS with orange theme (#F97315)

## Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build to ./dist
npm run preview  # Preview build locally
npx wrangler pages deploy ./dist  # Deploy to Cloudflare
```

## Directory Structure

```
src/
├── assets/              # Images referenced in config (logo.png)
├── components/          # Custom Astro components (override Starlight defaults)
│   ├── Header.astro     # Custom header with social icons
│   ├── Sidebar.astro    # Simplified sidebar (no tabs)
│   ├── PageFrame.astro  # Layout with TOC highlighting
│   ├── PageTitle.astro  # Title without breadcrumbs
│   ├── ThemeToggle.astro
│   ├── LinkCard.astro   # Navigation cards with icons
│   ├── CardGrid.astro   # Grid layout for cards
│   ├── Card.astro       # Individual card component
│   ├── Accordion.astro  # Collapsible FAQ items
│   ├── AccordionGroup.astro
│   └── Frame.astro      # Image frame wrapper
├── content/docs/        # MDX documentation files
│   ├── introduction.mdx # Landing page (/ redirects here)
│   ├── quick-start.mdx
│   ├── guides/          # How-to guides
│   ├── reference/       # API reference
│   ├── security.mdx
│   ├── glossary.mdx
│   └── faq.mdx
└── styles/
    └── custom.css       # Theme overrides
public/
├── images/              # Static images for docs
└── favicon.png
```

## Adding New Documentation

### 1. Create MDX File

Add file to `src/content/docs/` following the directory structure:
- Guides: `guides/`
- Reference: `reference/` or `reference/instructions/` or `reference/cpi-program/`

### 2. Add Frontmatter

```mdx
---
title: "Page Title"
description: "Brief description for SEO"
---
```

### 3. Update Sidebar

Edit `astro.config.mjs` → `sidebar` array:

```javascript
sidebar: [
  { label: 'Introduction', slug: 'introduction' },
  { label: 'Quick Start', slug: 'quick-start' },
  {
    label: 'Guides',
    items: [
      { label: 'Guide Name', slug: 'guides/guide-name' },
    ],
  },
],
```

### 4. Use Components

```mdx
import { Aside, Steps, Card, CardGrid } from '@astrojs/starlight/components';
import LinkCard from '../../components/LinkCard.astro';

<Aside type="tip">
Pro tip content here
</Aside>

<CardGrid>
  <LinkCard title="Card 1" href="/path1" icon="rocket" />
  <LinkCard title="Card 2" href="/path2" icon="download" />
</CardGrid>
```

**Important**: Use relative imports for custom components (e.g., `../../components/LinkCard.astro`), not `@components/`.

## Component Reference

| Component | Import | Usage |
|-----------|--------|-------|
| `<Aside>` | `@astrojs/starlight/components` | Notes, tips, warnings |
| `<Steps>` | `@astrojs/starlight/components` | Numbered step lists |
| `<Card>` | `@astrojs/starlight/components` | Feature cards |
| `<CardGrid>` | `@astrojs/starlight/components` | Grid layout for cards |
| `<LinkCard>` | `../../components/LinkCard.astro` | Navigation cards with icons |
| `<Accordion>` | `../../components/Accordion.astro` | Collapsible content |
| `<AccordionGroup>` | `../../components/AccordionGroup.astro` | Group of accordions |

### LinkCard Icons

Available: `arrow-right`, `rocket`, `download`, `paper-plane`, `shuffle`, `layer-group`, `clock-rotate-left`, `shield-halved`, `coins`, `arrows-rotate`, `wand-magic-sparkles`, `puzzle`, `document`

### Steps Example

```mdx
import { Steps } from '@astrojs/starlight/components';

<Steps>
1. **First Step**
   Content here

2. **Second Step**
   More content
</Steps>
```

## Configuration

### astro.config.mjs Key Sections

```javascript
export default defineConfig({
  redirects: {
    '/': '/introduction',  // Root redirects to introduction
  },
  integrations: [
    starlight({
      plugins: [starlightClientMermaid()],
      title: 'Range by Turbine',
      sidebar: [/* ... */],
    }),
  ],
});
```

### Cloudflare Deployment

```jsonc
// wrangler.jsonc
{
  "name": "range-docs",
  "pages_build_output_dir": "./dist"
}
```

## Gotchas

1. **Mermaid diagrams**: Requires `@pasqal-io/starlight-client-mermaid` plugin
2. **Import paths**: Use relative paths (`../../components/`) not aliases (`@components/`)
3. **Logo path**: Must reference `./src/assets/`, not `./public/`
4. **Redirects**: Configured in `astro.config.mjs` under `redirects`
5. **Build warnings**: Sitemap warning is benign (add `site` config to fix)
