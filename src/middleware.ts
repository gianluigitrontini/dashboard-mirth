import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const currentUser = cookies().get('JSESSIONID')?.value

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