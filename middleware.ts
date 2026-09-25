import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files that need to be accessible without redirects
  if (pathname === '/ads.txt' || pathname === '/robots.txt' || pathname === '/sitemap.xml' || pathname.startsWith('/.well-known/')) {
    return NextResponse.next();
  }

  let host = request.headers.get('host') || '';
  const protocol = request.headers.get('x-forwarded-proto') || 'https';

  // Redirect HTTP to HTTPS
  if (protocol === 'http') {
    return NextResponse.redirect(`https://${host}${pathname}${request.nextUrl.search}`, 301);
  }

  // Redirect www to non-www
  if (host.startsWith('www.')) {
    host = host.slice(4);
    return NextResponse.redirect(`https://${host}${pathname}${request.nextUrl.search}`, 301);
  }

  return NextResponse.next();
}
