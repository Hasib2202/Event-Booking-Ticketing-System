// src/middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Check if user is accessing admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (req.nextauth.token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    // Check if user is accessing dashboard routes
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        if (req.nextUrl.pathname.startsWith('/api/auth') ||
            req.nextUrl.pathname === '/' ||
            req.nextUrl.pathname.startsWith('/events') && req.method === 'GET' ||
            req.nextUrl.pathname.startsWith('/api/events') && req.method === 'GET' ||
            req.nextUrl.pathname === '/login' ||
            req.nextUrl.pathname === '/register') {
          return true;
        }

        // For protected routes, require token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/bookings/:path*',
    '/api/events/:path*',
    '/api/admin/:path*',
  ],
};
