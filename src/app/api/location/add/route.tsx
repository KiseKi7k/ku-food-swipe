import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newLocation = await prisma.location.createMany({
      data: body,
    });
    return NextResponse.json(
      { status: "success", data: body },
      { status: 200 },
    );
  } catch (error) {}
}
