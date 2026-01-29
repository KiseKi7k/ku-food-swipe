import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function base64ToBuffer(base64: string): Buffer {
    // If the base64 string has a data URI prefix, strip it
    const matches = base64.match(/^data:.+;base64,(.+)$/);
    const data = matches ? matches[1] : base64;
    return Buffer.from(data, "base64");
}


export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get("image") as File | null;
        const name = formData.get("Name") as string | null;
        const tags = formData.get("tags") as string | null;
        const shopId = formData.get("shopId") as string | null;
        const price = formData.get("price") as string | null;
        let tagsArray: { Name: string }[] = [];
        if (tags) {
            tagsArray = tags.split(",").map(tag => ({ Name: tag.trim() }));
        }

        console.log("Received name:", tags?.split(","));
        if (!file || !name) {
            return NextResponse.json({ error: "Missing file or name" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
 
        const foodDb = await prisma.food.findFirst({
            where: {
                foodName: { equals: name }
            },
            select: {
                id: true,
                foodName: true
            }
        });

        console.log("Fooddb:", foodDb ? foodDb : "Not found");
        // // 3. Save to Database
        let foodId = foodDb ? foodDb.id : null;
        if (!foodId) {
            const savedFood = await prisma.food.create({
                data: {
                    foodName: name,
                    image: buffer, // Prisma maps Buffer to 'Bytes' type in DB
                    
                },
            });
            foodId = savedFood.id;
        }
        const savedItem = await prisma.item.create({
            data: {
               foodId: foodId,
               shopId: shopId || null,
               priceMin: price ? parseFloat(price) : 0,
            },
        });

        return NextResponse.json({ success: true, id: savedItem.id });

    } catch (error: any) {
        console.error("Full Error Object:", error);
        return NextResponse.json(
            { error: "Prisma Error", message: error.message },
            { status: 500 }
        );
    }
}