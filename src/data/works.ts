import type { Locale } from '../lib/locale';
import entriesJson from './works/entries.json';

export type WorkEntry = {
	id: string;
	/** Lower numbers appear first */
	order?: number;
	title: Record<Locale, string>;
	summary: Record<Locale, string>;
	tags?: string[];
	image?: string;
	imageAlt?: Record<Locale, string>;
	github?: string;
	demo?: string;
	/** Overrides the default demo button label */
	demoLabel?: Record<Locale, string>;
};

/** Portfolio cards — edit `src/data/works/entries.json` */
export const workEntries = entriesJson as WorkEntry[];

export const WORKS_PAGE_SIZE = 2;
/** Hide pagination when entry count is small (mobile-friendly continuous scroll). */
export const WORKS_PAGINATION_THRESHOLD = 6;

export function getWorksEntries(): WorkEntry[] {
	return [...workEntries].sort((a, b) => {
		const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
		const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
		if (orderA !== orderB) return orderA - orderB;
		return a.title['zh-tw'].localeCompare(b.title['zh-tw'], 'zh-Hant');
	});
}

export function getWorksPageCount(pageSize = WORKS_PAGE_SIZE): number {
	return Math.max(1, Math.ceil(workEntries.length / pageSize));
}
