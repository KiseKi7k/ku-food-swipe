import { RecordStatus } from "@/generated/enums";
import { auth } from "@/lib/auth";
import { itemService } from "@/lib/service";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export type PlayRecordRouteBody = {
	history: {
		itemId: string;
		status: RecordStatus;
	}[];
};

export async function POST(req: NextRequest) {
	const body = (await req.json()) as PlayRecordRouteBody;

	try {
		const data = await auth.api.getSession({
			headers: await headers(),
		});

		if (!data) throw new Error("Session not found");

		const playRecord = await itemService.createPlayRecord({
			userId: data.user.id,
			history: body.history,
		});

		return NextResponse.json({ success: true, data: playRecord });
	} catch (error) {
		console.error("Full Error Object:", error);
		return NextResponse.json(
			{ error: "Prisma Error", message: error },
			{ status: 500 },
		);
	}
}
