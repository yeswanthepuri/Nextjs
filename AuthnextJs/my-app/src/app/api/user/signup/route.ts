import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";
import { console } from "inspector";


connection()



export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);

        const hashpassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashpassword
        });

       const savedUser = await newUser.save();
       console.log(savedUser);
       return NextResponse.json(
        { message:'User saved successfully', success:true  })

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }
}