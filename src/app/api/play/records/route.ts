import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// TODO: What's does this endpoint do
// It should be on reccommend

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const records = await prisma.record.create({
      data: data,
    });

    return NextResponse.json(
      { status: "success", data: records },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Prisma Error:", error); // Check your terminal for this!
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 },
    );
  }
}
