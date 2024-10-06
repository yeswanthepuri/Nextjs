import { connection } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json({ message: 'Log out Successifully', success: true })
        response.cookies.set('token','',{httpOnly:true, expires:new Date(0)});
        return response; 
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
    
}

