// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const root = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
	site: 'https://abraham.moe',
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'@': path.resolve(root, './src'),
			},
		},
	},
	integrations: [sitemap()],
	transitions: {
		default: 'none',
	},
	i18n: {
		defaultLocale: 'zh-tw',
		locales: ['zh-tw', 'en'],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: true,
		},
	},
	fonts: [
		{
			name: 'LXGW WenKai TC',
			cssVariable: '--font-wenkai',
			provider: fontProviders.google(),
			weights: [400, 700],
			subsets: ['latin', 'chinese-traditional'],
			fallbacks: ['sans-serif'],
		},
		{
			name: 'Google Sans Code',
			cssVariable: '--font-sans-code',
			provider: fontProviders.google(),
			weights: [400, 500, 600],
			subsets: ['latin'],
			fallbacks: ['monospace'],
		},
	],
});
