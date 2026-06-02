/** Full-site maintenance. Remove this file or redeploy without it to reopen. */
export const config = {
	matcher: ['/(.*)'],
};

export default function middleware() {
	return new Response('站點暫時關閉 · Site temporarily offline.', {
		status: 503,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Retry-After': '86400',
			'Cache-Control': 'no-store',
		},
	});
}
