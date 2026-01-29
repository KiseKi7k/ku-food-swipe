import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    function bytesToBase64(buffer: Buffer | Uint8Array): string {
        return Buffer.from(buffer).toString("base64");
    }
    try {
        const items = await prisma.item.findMany({ include: { food: {include: { tags: true }}, shop: true } }); // Removed unnecessary ({})
        let datas = items;
        const formattedData = items.map(item => {
    return {
        ...item,
        food: item.food ? {
            ...item.food,
            // Convert the bytes to Base64 if the image exists
            image: item.food.image ? `data:image/jpeg;base64,${bytesToBase64(item.food.image)}`: null
        } : null
    };
});
        return NextResponse.json({ status: 'success', data: formattedData }, { status: 200 });
    } catch (error: any) {
        console.error("Prisma Error:", error); // Check your terminal for this!
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}