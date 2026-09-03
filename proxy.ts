import {jwtVerify} from 'jose'
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function proxy(request: NextRequest) {
    const sessionToken = request.cookies.get('session')?.value;

    // 1. If no cookie exists, redirect to login page
    if(!sessionToken){
        return NextResponse.redirect(new URL('/rejoin', request.url));
    }

    try {
        // 2. Verify token validity at the Vercel Edge
        await jwtVerify(sessionToken, SECRET, {
            algorithms: ["HS256"],
        });
        return NextResponse.next();
    } catch (error) {   
        const response =  NextResponse.redirect(new URL('/rejoin', request.url));
        response.cookies.delete("session"); //remove expired/invalid token
        return response;
    }
}

export const config = {
    matcher: [`/admin/:path*`], // Protects everything under these folders
}