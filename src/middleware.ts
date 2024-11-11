import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const currentUser = cookieStore.get('JSESSIONID')?.value

    // Loggato
    if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
        return Response.redirect(new URL('/dashboard', request.url))
    }

    // Non Loggato
    if (!currentUser && !request.nextUrl.pathname.startsWith('/auth/login')) {
        return Response.redirect(new URL('/auth/login', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}