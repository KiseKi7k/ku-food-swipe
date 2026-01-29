import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function bytesToBase64(buffer: Buffer | Uint8Array): string {
  return Buffer.from(buffer).toString("base64");
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const partial = searchParams.get("partial") === "true"; // For AI Fetch

  try {
    if (partial) {
      const items = await prisma.item.findMany({
        select: {
          id: true,
          food: {
            select: {
              name: true,
              tags: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      return NextResponse.json(
        { status: "success", data: items },
        { status: 200 },
      );
    }

    const itemsRaw = await prisma.item.findMany({
      select: {
        id: true,
        priceMin: true,
        priceMax: true,
        food: {
          select: {
            name: true,
            tags: {
              select: {
                name: true,
              },
            },
            image: true,
          },
        },
        shop: {
          select: {
            name: true,
            location: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const items = itemsRaw.map((item) => {
      return {
        ...item,
        food: {
          ...item.food,
          image: item.food.image
            ? `data:image/jpeg;base64,${bytesToBase64(item.food.image)}`
            : null,
        },
      };
    });

    return NextResponse.json(
      { status: "success", data: items },
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
