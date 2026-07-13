import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function POST(request: Request) {

    try {
        const {user, password} = await request.json()
        const adminPassword = await redis.get<string>('admin')

        if (!adminPassword) {
            return NextResponse.json(
                {error: 'No Data found in Database'},
                {status: 500}
            )
        }

        const NameCheck = user.trim().toLocaleLowerCase() === process.env.ADMIN_NAME?.trim().toLocaleLowerCase()

        if (!NameCheck) {
            return NextResponse.json(
                {error: 'Your Credentials are invalid'},
                {status:401}
            )
        }


        const passwordMatch = password?.trim().toLocaleLowerCase() === adminPassword

        if (!passwordMatch){
            return NextResponse.json(
                {error: 'Invalid Credentials'},
                {status: 401}
            )
        }

        const response = NextResponse.json(
            {success: true}
        )

        response.cookies.set('admin_cookie', 'true',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60*60*2,
            path: '/',
        })

        return response

    } catch (error) {
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        )
    }

}