import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userPlayId = req.cookies.get("userPlayId")?.value;
    if (!userPlayId) {
      return NextResponse.json(
        { status: "Session not found", data: null },
        { status: 404 },
      );
    }

    const userPlay = await prisma.userPlay.findUnique({
      where: { id: userPlayId },
      select: {
        id: true,
        status: true,
        records: {
          select: {
            id: true,
            status: true,
            itemId: true,
          },
        },
      },
    });
    return NextResponse.json(
      { status: "success", data: userPlay },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Prisma Error:", error);
    return NextResponse.json({ status: "error", data: null }, { status: 500 });
  }
}
