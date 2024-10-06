import { connection } from "@/dbConfig/dbConfig";

import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";



connection()


export async function GET(request: NextRequest) {

    try {
     const id = await getDataFromToken(request);
     console.log(id);
     const user = await User.findOne({_id: id}).select('-password');
    console.log(user);
    return NextResponse.json({message:"Userfound", data: user});

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}