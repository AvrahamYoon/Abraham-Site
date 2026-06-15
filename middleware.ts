import { next } from '@vercel/functions';

/** Static matcher only — Vercel does not support expressions in config.matcher. */
export const config = {
	matcher: ['/((?!_astro/|favicon\\.ico|favicon\\.svg|robots\\.txt|sitemap).*)'],
};

function parseBlockedIps(raw?: string): Set<string> {
	const ips = new Set<string>();
	if (!raw) return ips;
	for (const part of raw.split(',')) {
		const ip = part.trim();
		if (ip) ips.add(ip);
	}
	return ips;
}

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
	const blockedIps = parseBlockedIps(process.env.BLOCKED_IPS);
	const ip = getClientIp(request);
	if (ip && blockedIps.has(ip)) {
		return new Response(null, { status: 403 });
	}

	const pathname = new URL(request.url).pathname;
	if (isScanPath(pathname)) {
		return new Response(null, { status: 403 });
	}

	return next();
}
