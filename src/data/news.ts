import type { Locale } from '../lib/locale';

export type NewsCategoryId = 'site' | 'study' | 'radio' | 'church' | 'masonic' | 'other';

export const newsCategoryLabels: Record<NewsCategoryId, Record<Locale, string>> = {
	site: { 'zh-tw': '網站', en: 'Site' },
	study: { 'zh-tw': '學業', en: 'Study' },
	radio: { 'zh-tw': '電台', en: 'Radio' },
	church: { 'zh-tw': '教會', en: 'Church' },
	masonic: { 'zh-tw': '美生會', en: 'Freemasonry' },
	other: { 'zh-tw': '其他', en: 'Other' },
};

export type NewsEntry = {
	id: string;
	/** ISO date: YYYY-MM-DD or YYYY-MM */
	date: string;
	category: NewsCategoryId;
	title: Record<Locale, string>;
	note?: Record<Locale, string>;
};

/** Newest first after sort in NewsTimeline */
export const newsEntries: NewsEntry[] = [
	{
		id: 'site-launch',
		date: '2026-05',
		category: 'site',
		title: { 'zh-tw': '個人站上線', en: 'Personal site launched' },
		note: {
			'zh-tw': '雙語個人站首次部署至 Vercel。',
			en: 'Bilingual personal site first deployed to Vercel.',
		},
	},
];

export function getNewsEntriesSorted(): NewsEntry[] {
	return [...newsEntries].sort((a, b) => b.date.localeCompare(a.date));
}
