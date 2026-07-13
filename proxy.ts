import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest){
    const session = request.cookies.get('admin_cookie')?.value

    if (request.nextUrl.pathname.startsWith('/admin') && session !== 'true') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*'
}