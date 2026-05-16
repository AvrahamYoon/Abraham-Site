# Abraham Site

Personal link hub for **幽靈 / Abraham Yin** — a static site with Traditional Chinese and English content.

| Locale | Base path |
|--------|-----------|
| Traditional Chinese | `/zh-tw/` |
| English | `/en/` |

`/ ` redirects to `/zh-tw/`.

## Tech stack

[![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Markdown](https://img.shields.io/badge/Markdown-000000?style=flat&logo=markdown&logoColor=white)](https://www.markdownguide.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

Badges from [Shields.io](https://shields.io/) (`style=flat`).

Also used: Astro Fonts (LXGW WenKai TC, Google Sans Code), `@astrojs/sitemap`, built-in i18n, and `astro:transitions` ClientRouter.

## Local development

Requires **Node.js ≥ 22.12**.

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://127.0.0.1:4321`).

```bash
npm run build    # output → dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
├── pages/
│   ├── zh-tw/          # Traditional Chinese (Markdown + home)
│   └── en/             # English pages
├── layouts/            # Home, inner pages, Markdown wrapper
├── components/
├── data/               # site.ts, nav.ts
├── styles/global.css
└── lib/locale.ts       # locale helpers & language switch URLs
public/                 # avatar, favicon, static assets
```

### Editing content

| What to change | File(s) |
|----------------|---------|
| Name, email, social links | `src/data/site.ts` |
| Navigation items | `src/data/nav.ts` |
| Page copy | `src/pages/zh-tw/*.md`, `src/pages/en/*.md` |
| Production URL (sitemap, canonical) | `astro.config.mjs` → `site` |

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import it on [Vercel](https://vercel.com) (**Add New… → Project**).
3. Confirm build settings (usually auto-detected from [`vercel.json`](./vercel.json)):
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Framework Preset:** Astro
4. After deploy you get a `*.vercel.app` subdomain.

[`vercel.json`](./vercel.json) configures:

- Astro build and `dist` output
- `/` → `/zh-tw/`
- Legacy `/zh-TW/...` → `/zh-tw/...` (301)

### Custom domain

1. In the Vercel project, go to **Settings → Domains** and add your domain (e.g. `abraham.moe`).
2. Add the DNS records Vercel shows at your registrar.
3. Set `site` in `astro.config.mjs` to your live URL (include `https://`), then redeploy so sitemap and canonical links are correct.

```js
site: 'https://your-domain.example',
```

## License

Personal site source. No separate open-source license is declared unless you add one.
