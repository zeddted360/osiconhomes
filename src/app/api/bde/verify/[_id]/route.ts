import { Bde } from "@/models/bde";
import { connectDb } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  _id: string;
}

export const PATCH = async (
  request: NextRequest,
  { params }: { params: IParams }
) => {
  try {
    await connectDb();
    const { _id } = await params;
    const updatedBde = await Bde.findByIdAndUpdate(
      _id,
      { isVerified: true },
      { new: true }
    ).select("username");

    if (!updatedBde) {
      throw new Error("Bde not found it may have been removed");
    }
      return NextResponse.json({ success: true, message: updatedBde }, { status: 200 });
  } catch (error) {
    console.error(error);
      return NextResponse.json({
          success: false,
          message: error instanceof Error ? error.message : "Internal server error",
      }, { status: 500 });
  }
};
