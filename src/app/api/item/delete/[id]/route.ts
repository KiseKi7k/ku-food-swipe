import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const food = await prisma.items.delete({
            where: { id: id }
        });


        return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error serving image:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
