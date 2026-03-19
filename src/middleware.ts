import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, isValidToken } from '@/lib/auth';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Bypass login page if already authenticated 
    if (pathname === '/admin') {
        const sessionToken = req.cookies.get(SESSION_COOKIE)?.value;
        if (sessionToken && isValidToken(sessionToken)) {
            return NextResponse.redirect(new URL('/admin/dashboard', req.url));
        }
        return NextResponse.next();
    }

    const isProtected =
        pathname.startsWith('/admin/dashboard') ||
        (pathname.startsWith('/api/content') && req.method !== 'GET');

    if (!isProtected) return NextResponse.next();

    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token || !isValidToken(token)) {
        const loginUrl = new URL('/admin', req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/admin/dashboard/:path*', '/api/content'],
};
