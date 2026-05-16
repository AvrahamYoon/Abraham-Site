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
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
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

Production URL: **https://abraham.moe** (already set in `astro.config.mjs`).

1. In the Vercel project, go to **Settings → Domains** and add `abraham.moe` (and `www.abraham.moe` if you use it).
2. Add the DNS records Vercel shows at your registrar.
3. After DNS propagates, redeploy once so sitemap and canonical links pick up the live domain.

```js
site: 'https://abraham.moe',
```

## Acknowledgments

Layout and concept were inspired by [liyan.moe](https://github.com/liyanqwq/liyan.moe) ([@liyanqwq](https://github.com/liyanqwq)). This repo is a separate implementation with its own content, styling, and features.

## License

This project is licensed under the **[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html)** (GPL-3.0).

- You may use, study, share, and modify this work under the GPL.
- **Copyleft** — if you distribute a modified version, you must license it under the GPL and make the corresponding source available.
- No warranty — see the license for details.

See [LICENSE](./LICENSE) for the full text.
