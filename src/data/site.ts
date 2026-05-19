import type { Locale } from '../lib/locale';

export const nameByLocale: Record<Locale, string> = {
	'zh-tw': '幽靈',
	en: 'Abraham Yin',
};

export const site = {
	avatar: '/profile.jpg',
	email: 'AbrahamYin@proton.me',
	social: [
		{ id: 'github', href: 'https://github.com/AvrahamYoon', label: 'GitHub' },
		{ id: 'linkedin', href: 'https://www.linkedin.com/', label: 'LinkedIn' },
		{ id: 'twitter', href: 'https://x.com/', label: 'X' },
		{ id: 'telegram', href: 'https://t.me/', label: 'Telegram' },
	],
	icp: '',
} as const;

const metaByLocale: Record<
	Locale,
	{ title: string; description: string; copyright: string }
> = {
	'zh-tw': {
		title: '幽靈',
		description: '幽靈的個人站 — 關於、動態、作品、友人與常用連結。',
		copyright: '© 2019 - {year} 幽靈.',
	},
	en: {
		title: 'Abraham Yin',
		description: "Abraham Yin's personal hub — about, news, works, friends, and links.",
		copyright: '© 2019 - {year} Abraham Yin.',
	},
};

export function getSiteName(locale: Locale) {
	return nameByLocale[locale];
}

export function getSiteMeta(locale: Locale) {
	const meta = metaByLocale[locale];
	return {
		...meta,
		copyright: meta.copyright.replace('{year}', String(new Date().getFullYear())),
	};
}
