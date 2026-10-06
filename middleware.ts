import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|ads.txt).*)'],
};

export function middleware(request: NextRequest) {
  const protocol = request.headers.get('x-forwarded-proto') || 'https';

  // Redirect HTTP to HTTPS only
  if (protocol === 'http') {
    const host = request.headers.get('host') || 'moneycalcs.ai';
    const pathname = request.nextUrl.pathname;
    return NextResponse.redirect(`https://${host}${pathname}${request.nextUrl.search}`, 301);
  }

  return NextResponse.next();
}
