import { next } from '@vercel/functions';

/** On by default. Set MAINTENANCE_MODE=0 in Vercel and redeploy to reopen the site. */
const maintenance = process.env.MAINTENANCE_MODE !== '0';

function parseBlockedIps(raw?: string): Set<string> {
	const ips = new Set<string>();
	if (!raw) return ips;
	for (const part of raw.split(',')) {
		const ip = part.trim();
		if (ip) ips.add(ip);
	}
	return ips;
}

const blockedIps = parseBlockedIps(process.env.BLOCKED_IPS);
const ipBlockActive = blockedIps.size > 0;

const scanMatchers = [
	'/.env',
	'/.env.local',
	'/.env.production',
	'/.git/:path*',
	'/wp-admin/:path*',
	'/wp-includes/:path*',
	'/wp-content/:path*',
	'/wp-login.php',
	'/wordpress/:path*',
	'/xmlrpc.php',
	'/phpmyadmin/:path*',
	'/administrator/:path*',
];

/** Wide matcher when maintenance or IP block is enabled at deploy time. */
const wideMatchers = [
	'/((?!_astro/|favicon\\.ico|favicon\\.svg|robots\\.txt|sitemap).*)',
];

const maintenanceMatchers = ['/(.*)'];

export const config = {
	matcher: maintenance ? maintenanceMatchers : ipBlockActive ? wideMatchers : scanMatchers,
};

const maintenanceBody = '站點暫時關閉 · Site temporarily offline.';

function getClientIp(request: Request): string | null {
	const forwarded = request.headers.get('x-forwarded-for');
	if (forwarded) {
		const first = forwarded.split(',')[0]?.trim();
		if (first) return first;
	}
	return request.headers.get('x-real-ip');
}

function isScanPath(pathname: string): boolean {
	if (pathname === '/wp-login.php' || pathname === '/xmlrpc.php') return true;
	if (pathname.startsWith('/.env') || pathname.startsWith('/.git/')) return true;
	return (
		pathname.startsWith('/wp-') ||
		pathname.startsWith('/wordpress') ||
		pathname.startsWith('/phpmyadmin') ||
		pathname.startsWith('/administrator')
	);
}

export default function middleware(request: Request) {
	if (maintenance) {
		return new Response(maintenanceBody, {
			status: 503,
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Retry-After': '86400',
				'Cache-Control': 'no-store',
			},
		});
	}

	const ip = getClientIp(request);
	if (ip && blockedIps.has(ip)) {
		return new Response(null, { status: 403 });
	}

	if (maintenance || ipBlockActive) {
		const pathname = new URL(request.url).pathname;
		if (isScanPath(pathname)) {
			return new Response(null, { status: 403 });
		}
		return next();
	}

	return new Response(null, { status: 403 });
}
