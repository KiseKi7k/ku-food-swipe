import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany(); // Removed unnecessary ({})
    return NextResponse.json(
      { status: "success", data: users },
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
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newCustomerServices = await prisma.user.createMany({
      data: body,
    });
    return NextResponse.json(
      { status: "success", data: body },
      { status: 200 },
    );
  } catch (error) {}
}
