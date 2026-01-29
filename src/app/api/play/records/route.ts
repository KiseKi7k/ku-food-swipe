import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: Request) {

    try {
        const data = await req.json();

        let result;
        if (Array.isArray(data)) {
            // Batch create
            result = await prisma.record.createMany({
                data: data
            });
        } else {
            // Single create
            result = await prisma.record.create({
                data: data
            });
        }

        return NextResponse.json({ status: 'success', data: result }, { status: 200 });
    } catch (error: any) {
        console.error("Prisma Error:", error); // Check your terminal for this!
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}