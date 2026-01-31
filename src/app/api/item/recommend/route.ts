import { RecordStatus } from "@/generated/enums";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // TODO: refactor this into middleware
    const userPlayId = req.cookies.get("userPlayId")?.value;
    if (!userPlayId) {
      return NextResponse.json(
        { status: "error", message: "Invalid session" },
        { status: 404 },
      );
    }

    const userPlay = await prisma.userPlay.findUnique({
      where: {
        id: userPlayId,
      },
    });

    if (!userPlay) {
      return NextResponse.json(
        { status: "error", message: "Invalid session" },
        { status: 404 },
      );
    }

    const {
      records,
      dislikeId,
    }: {
      records: { itemId: string; status: RecordStatus }[];
      dislikeId: string[];
    } = await req.json();

    // Update 5 last records to db
    // TODO: Uncomment this later
    // const lastRecords = records.slice(-5);
    // await prisma.record.createMany({
    //   data: lastRecords.map((record) => {
    //     return {
    //       itemId: record.itemId,
    //       status: record.status,
    //       userPlayId: userPlayId,
    //     };
    //   }),
    // });

    // Fetch food ids from recommend service
    const res = await fetch(process.env.RECOMMEND_SERVICE_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records,
        dislikeId,
      }),
    });

    const { foodIds }: { foodIds: string[] } = await res.json();
    const filterdItemIds = foodIds.filter((id) => !dislikeId.includes(id));

    const items = await prisma.item.findMany({
      where: {
        id: {
          in: filterdItemIds,
        },
      },
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

    console.log(items);

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
