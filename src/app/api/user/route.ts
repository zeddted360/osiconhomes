import { NextRequest, NextResponse } from "next/server"


export const GET = async () => {


    return NextResponse.json({Message: "Api server running"}) 
}