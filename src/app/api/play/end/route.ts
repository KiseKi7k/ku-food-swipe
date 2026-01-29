import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// TODO: Save the rest of records

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const success = searchParams.get("success") === "true"; // For handle user return to home page

    const userPlayId = req.cookies.get("userPlayId")?.value;
    if (!userPlayId) {
      return NextResponse.json(
        { status: "error", message: "Invalid session" },
        { status: 404 },
      );
    }

    // If user leave session
    if (success) {
      await prisma.userPlay.update({
        where: { id: userPlayId },
        data: { status: "CLOSED" },
      });
    } else {
      await prisma.userPlay.delete({
        where: { id: userPlayId },
      });
    }

    const res = NextResponse.json({ status: "success" }, { status: 200 });
    res.cookies.delete("userPlayId");

    return res;
  } catch (error: any) {
    console.error("Prisma Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 },
    );
  }
}
