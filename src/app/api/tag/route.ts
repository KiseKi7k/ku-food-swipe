import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(
      { status: "success", data: tags },
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
