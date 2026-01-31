import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const shops = await prisma.shop.findMany();
    return NextResponse.json(
      { status: "success", data: shops },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Prisma Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 },
    );
  }
}
