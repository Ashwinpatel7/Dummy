import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login';

  // Check if user is authenticated by looking for the auth cookie
  const isAuthenticated = request.cookies.has('hr-auth-user');

  // Redirect logic
  if (path === '/') {
    // Root path should redirect to login if not authenticated, otherwise to dashboard
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    } else {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // If the user is on a public path and is authenticated, redirect to dashboard
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If the user is not on a public path and is not authenticated, redirect to login
  if (!isPublicPath && !isAuthenticated && path !== '/_next/static' && !path.includes('.')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Continue with the request
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard',
    '/bookmarks',
    '/analytics',
    '/employee/:path*',
  ],
};
