import type { Locale } from '../lib/locale';

export type NavId = 'about' | 'works' | 'radio' | 'friends' | 'donate';

/** 之後可加：{ id: 'blog', path: '/blog', label: { 'zh-tw': '博客', en: 'Blog' } } */
export type NavItem = {
	id: NavId;
	path: string;
	label: Record<Locale, string>;
};

export const navItems: NavItem[] = [
	{
		id: 'about',
		path: '/about',
		label: { 'zh-tw': '關於', en: 'About' },
	},
	{
		id: 'works',
		path: '/works',
		label: { 'zh-tw': '作品', en: 'Works' },
	},
	{
		id: 'radio',
		path: '/radio',
		label: { 'zh-tw': '電台', en: 'Radio' },
	},
	{
		id: 'friends',
		path: '/friends',
		label: { 'zh-tw': '友人', en: 'Friends' },
	},
	{
		id: 'donate',
		path: '/donate',
		label: { 'zh-tw': '捐助', en: 'Donate' },
	},
];

export function getNavItem(id: NavId) {
	const item = navItems.find((entry) => entry.id === id);
	if (!item) throw new Error(`Unknown nav id: ${id}`);
	return item;
}
