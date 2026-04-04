import { RecordStatus } from "@/generated/enums";
import { itemService } from "@/service/item.service";
import { Filter } from "@/types/type";
import { NextRequest, NextResponse } from "next/server";

export type RecommendFoodRouteBody = {
	filter: Omit<Filter, "seenItems" | "targetItems">;
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
		let filter = {} as Filter;
		const limit = 15;
		const body = (await req.json()) as RecommendFoodRouteBody;
		const seenItems = body.history.map((h) => h.itemId);

		try {
			const controller = new AbortController();
			const timeout = setTimeout(() => controller.abort(), 3000);

			if (!process.env.RECOMMEND_SERVICE_URL)
				throw new Error("Recommend Service Url is missing");

			const res = await fetch(process.env.RECOMMEND_SERVICE_URL, {
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
			clearTimeout(timeout);

			if (!res.ok) throw new Error("Recommend service failed");

			const { foodIds }: { foodIds: string[] } = await res.json();
			const seenItemsSet = new Set(seenItems);
			const targetItems = foodIds.filter((id) => !seenItemsSet.has(id));
			filter = { ...body.filter, targetItems };
		} catch (err) {
			console.error(err);
			filter = { ...body.filter, seenItems };
		}
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
