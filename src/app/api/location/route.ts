import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(
      { status: "success", data: locations },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Prisma Error:", error);
    return NextResponse.json(
      { status: "error", data: [], message: error.message },
      { status: 500 },
    );
  }
}
