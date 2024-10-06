import { NextRequest } from 'next/server'

import jwt from "jsonwebtoken";


export const getDataFromToken =  async (req: NextRequest) => {
try {
   const token =  req.cookies.get('token')?.value;

   if (!token) {
    return new Error("Token not found")
   }

   const data :any = jwt.verify(token, process.env.TOKEN_SECRET!);

   if (!data) {
    return new Error("Token not valid")
   }
  return data.id;

} catch (error) {
    console.log(error);
    return new Error("Token not found")
}
    
}