import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const authRes = await auth.api.getSession({
      headers: await headers(),
    });

    const userPlay = await prisma.userPlay.create({
      data: {
        status: "ACTIVE",
        users: {
          connect: {
            id: authRes?.user?.id,
          },
        },
      },
    });

    const res = NextResponse.json(
      { status: "success", data: userPlay },
      { status: 200 },
    );

    res.cookies.set("userPlayId", userPlay.id, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error: any) {
    console.error("Prisma Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 },
    );
  }
}
