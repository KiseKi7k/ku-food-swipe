import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await prisma.shop.createMany({
      data: body,
    });
    return NextResponse.json(
      { status: "success", data: body },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", data: [], message: error.message },
      { status: 500 },
    );
  }
}
