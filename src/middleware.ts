import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const ADMIN_TOKEN_NAME = 'adminToken';

// Routes that require authentication
const protectedRoutes = ['/admin/dashboard', '/admin/destinations', '/admin/tours', '/admin/blog', '/admin/gallery', '/admin/testimonials', '/admin/faqs', '/admin/inquiries', '/admin/activity-log', '/admin/settings'];

// Routes that should redirect to dashboard if already logged in
const authRoutes = ['/admin/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Get the token from cookie
  const token = request.cookies.get(ADMIN_TOKEN_NAME)?.value;

  if (isProtectedRoute) {
    // No token found - redirect to login
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify token
    try {
      jwt.verify(token, JWT_SECRET);
      // Token is valid - allow access
      return NextResponse.next();
    } catch (error) {
      // Invalid token - redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);
      // Clear the invalid cookie
      response.cookies.delete(ADMIN_TOKEN_NAME);
      return response;
    }
  }

  if (isAuthRoute && token) {
    // Already logged in - redirect to dashboard
    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } catch {
      // Invalid token - allow access to login page
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
