import { itemService } from "@/service/item.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;

	const limitStr = searchParams.get("limit");
	const limit = limitStr ? Number(limitStr) : undefined;

	const pageStr = searchParams.get("page");
	const page = pageStr ? Number(limitStr) : undefined;

	try {
		const items = await itemService.getItemsInfo(limit, page);

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
