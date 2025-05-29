import { Bde } from "@/models/bde";
import { connectDb } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid";


export const POST = async (request: NextRequest) => {
    
    const { firstname, lastname, username, email,phone,password } =
        await request.json();
    try {
        await connectDb();
        const existBde = await Bde.findOne({ $or: [{ email }, { username }] });
        const referralCode = nanoid(10);

        if (existBde) {
            throw new Error("Sorry this BDE has already registered");
        }

        await Bde.create({
            firstname,
            lastname,
            username,
            email,
            phone,
            password,
            referralCode
        })
        return NextResponse.json({ success: true, message: "BDE successfully added" }, { status: 200 });
        
    } catch (error) {
        console.error(error instanceof Error ? error.message : "server error"); 
        return NextResponse.json({ success: false, message: "Error during registeration" }, { status: 500 });
    }


}