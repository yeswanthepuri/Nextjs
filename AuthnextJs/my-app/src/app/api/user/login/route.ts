import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { console } from "inspector";


connection()



export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 400 })
        }

        const matchPassword = await bcryptjs.compare(password, user.password);
        if (!matchPassword) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 400 })
        }
        const tokendata = {
            id: user._id,
            email: user.email

        }

        const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json({ message: 'Log in Successifully', success: true })
        response.cookies.set('token', token, { httpOnly: true })

        return response;

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }
}