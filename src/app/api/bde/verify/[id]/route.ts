import { Bde } from "@/models/bde";
import { connectDb } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  id: Promise<string>;
}

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<IParams> }
) => {
  try {
    await connectDb();
    const { id } = await params;
    const updatedBde = await Bde.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    ).select("username");

    if (!updatedBde) {
      return NextResponse.json(
        {
          success: false,
          message: "Bde not found or may have been removed",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: updatedBde },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating Bde:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};
