import { getRelativeLocaleUrl } from 'astro:i18n';

export const locales = ['zh-tw', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh-tw';

export function getLocale(currentLocale: string | undefined): Locale {
	if (currentLocale === 'en') return 'en';
	return 'zh-tw';
}

function isLocale(segment: string): segment is Locale {
	return locales.includes(segment as Locale);
}

/** 去掉 URL 里的语言前缀，例如 /zh-tw/radio → /radio */
export function stripLocaleFromPath(pathname: string): string {
	const segments = pathname.split('/').filter(Boolean);
	if (segments.length > 0 && isLocale(segments[0])) {
		const rest = segments.slice(1);
		return rest.length > 0 ? `/${rest.join('/')}` : '/';
	}
	return pathname || '/';
}

export function getLocalizedUrl(locale: Locale, pathname: string): string {
	return getRelativeLocaleUrl(locale, stripLocaleFromPath(pathname));
}
