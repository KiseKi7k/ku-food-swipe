import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Incoming body:", body); // CHECK YOUR TERMINAL FOR THIS

        if (!body.name) {
            return NextResponse.json({ error: "Name field is required" }, { status: 400 });
        }

        const newLocation = await prisma.location.create({
            data: {
                name: body.name
            }
        });

        return NextResponse.json({ status: 'success', data: newLocation }, { status: 201 });

    } catch (error: any) {
        // This will print the EXACT reason Prisma is angry
        console.error("PRISMA ERROR:", error.message);
        return NextResponse.json({
            error: "Validation Failed",
            details: error.message
        }, { status: 500 });
    }
}