import { itemService } from "@/lib/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;

	const limitStr = searchParams.get("limit");
	const limit = limitStr ? Number(limitStr) : 10;

	const tags = searchParams.get("tags")?.split(",") ?? [];
	const locations = searchParams.get("locations")?.split(",") ?? [];

	const priceMinStr = searchParams.get("priceMin");
	const priceMin = priceMinStr ? Number(priceMinStr) : undefined;

	const priceMaxStr = searchParams.get("priceMin");
	const priceMax = priceMaxStr ? Number(priceMaxStr) : undefined;

	const filter = {
		tags,
		locations,
		priceMin,
		priceMax,
	};

	try {
		const items = await itemService.getItems(filter, limit);

		return NextResponse.json(
			{ status: "success", data: items },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Prisma Error:", error);
		return NextResponse.json(
			{ status: "error", data: [], message: error },
			{ status: 500 },
		);
	}
}
