import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isComingSoon = process.env.COMING_SOON === 'true';
  
  if (isComingSoon) {
    // Allow access to coming soon page and static assets
    if (request.nextUrl.pathname === '/coming-soon' || 
        request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname.startsWith('/static') ||
        request.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.next();
    }
    
    // Redirect all other pages to coming soon
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
