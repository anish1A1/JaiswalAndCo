import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import bcrypt from 'bcrypt'
import { SignJWT } from 'jose';
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function POST(request: Request) {

    // Installed Bcrypt for Encrypting and decrypting password 
    // Installed jose for Session management
    // Also jose will look from middleware

    try {
        const {user, password} = await request.json()

        // Basic Validation
        if (!user || !password) {
            return NextResponse.json({error: 'Missing name or password'}, {status : 400});
        }

        const normalizedUsername = user.toLocaleLowerCase().trim() 
        const redisKey = `user:auth:${normalizedUsername}`;
        const hashehPassword = await redis.get<string>(redisKey);

        if (!hashehPassword || !(await bcrypt.compare(password, hashehPassword))) {
            return NextResponse.json({error: 'Invalid username or password'}, {status:401})
        }

        const token = await new SignJWT({user: normalizedUsername}) 
            .setProtectedHeader({alg : 'HS256'})
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(SECRET);
        
        // 2. Set the secure cookie
        const cookieStore = await cookies();
        cookieStore.set('session', token, {
        httpOnly: true, // Prevents client-side Javascript from reading the cookie (protects against XSS)
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'lax', // Protects against CSRF attacks
        path: '/', // Available across your entire site
        maxAge: 60 * 60 * 2, // 2 hours in seconds
        });


        return NextResponse.json({success: true, 'message': 'Logged In successfully!'})
       

    } catch (error) {
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        )
    }

}