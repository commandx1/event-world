import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/events'];
const authRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;

    const { pathname } = request.nextUrl;

    const isProtectedRoute = protectedRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}
