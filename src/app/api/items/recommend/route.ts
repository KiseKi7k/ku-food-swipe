import { RecordStatus } from "@/generated/enums";
import { itemService } from "@/lib/service";
import { NextRequest, NextResponse } from "next/server";

export type RecommendFoodRouteBody = {
	filter: {
		tags: string[];
		locations: string[];
		priceMin: number;
		priceMax: number;
	};
	history: {
		itemId: string;
		status: RecordStatus;
	}[];
};

// 1. user send filter and history
// 2. api send filter and history to recommend service
// 3. recommend service send back ids
// 4. api search items by ids
// 5. if recommend service not avaiable get item that user haven't seen yet
export async function POST(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const body = (await req.json()) as RecommendFoodRouteBody;

		const limitStr = searchParams.get("limit");
		const limit = limitStr ? Number(limitStr) : 10;

		const seenItems = body.history.map((h) => h.itemId);

		const controller = new AbortController();
		setTimeout(() => controller.abort(), 3000);

		const res = await fetch(process.env.RECOMMEND_SERVICE_URL!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				filter: body.filter,
				history: body.history,
			}),
			signal: controller.signal,
		});

		// Return recommended items
		if (res.ok) {
			const { foodIds }: { foodIds: string[] } = await res.json();
			const seenItemsSet = new Set(seenItems);
			const targetItems = foodIds.filter((id) => !seenItemsSet.has(id));
			const filter = { ...body.filter, targetItems };

			const items = await itemService.getItems(filter, limit);
			return NextResponse.json(
				{ status: "success", data: items },
				{ status: 200 },
			);
		} else {
			// Return query items
			const filter = { ...body.filter, seenItems };
			const items = await itemService.getItems(filter, limit);
			return NextResponse.json(
				{ status: "success", data: items },
				{ status: 200 },
			);
		}
	} catch (error) {
		console.error("Prisma Error:", error);
		return NextResponse.json(
			{ status: "error", data: [], message: error },
			{ status: 500 },
		);
	}
}
