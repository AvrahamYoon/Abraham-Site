import type { Locale } from '../lib/locale';
import entriesJson from './news/entries.json';

export type NewsCategoryId = 'site' | 'study' | 'radio' | 'church' | 'masonic' | 'other';

export const newsCategoryLabels: Record<NewsCategoryId, Record<Locale, string>> = {
	site: { 'zh-tw': '網站', en: 'Site' },
	study: { 'zh-tw': '學業', en: 'Study' },
	radio: { 'zh-tw': '電台', en: 'Radio' },
	church: { 'zh-tw': '教會', en: 'Church' },
	masonic: { 'zh-tw': '美生會', en: 'Freemasonry' },
	other: { 'zh-tw': '其他', en: 'Other' },
};

/** Display order for filter pills (left → right before 「全部」) */
export const newsCategoryOrder: NewsCategoryId[] = [
	'site',
	'study',
	'radio',
	'church',
	'masonic',
	'other',
];

export type NewsEntry = {
	id: string;
	/** ISO date: YYYY-MM-DD or YYYY-MM */
	date: string;
	category: NewsCategoryId;
	title: Record<Locale, string>;
	note: Record<Locale, string>;
};

/** Timeline content — edit `src/data/news/entries.json` */
export const newsEntries = entriesJson as NewsEntry[];

export function getNewsEntriesSorted(): NewsEntry[] {
	return [...newsEntries].sort((a, b) => b.date.localeCompare(a.date));
}

export function getNewsCategoriesInUse(): NewsCategoryId[] {
	const used = new Set(newsEntries.map((entry) => entry.category));
	return newsCategoryOrder.filter((id) => used.has(id));
}
