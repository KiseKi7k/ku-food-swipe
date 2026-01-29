import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]; // Create a copy so you don't mutate the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function bytesToBase64(buffer: Buffer | Uint8Array): string {
  return Buffer.from(buffer).toString("base64");
}

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      include: { food: { include: { tags: true } }, shop: true },
    });
    const shuffledItems = shuffleArray(items);
    const formattedData = shuffledItems.map((item) => {
      return {
        ...item,
        food: item.food
          ? {
              ...item.food,
              // Convert the bytes to Base64 if the image exists
              image: item.food.image
                ? `data:image/jpeg;base64,${bytesToBase64(item.food.image)}`
                : null,
            }
          : null,
      };
    });

    return NextResponse.json(
      { status: "success", data: formattedData },
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
