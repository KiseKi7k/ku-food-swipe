import { RecordStatus } from "@/generated/enums";
import { itemService } from "@/lib/service";

export type Tag = {
	id: string;
	name: string;
};

export type Location = {
	id: string;
	name: string;
};

export type UserPlay = {
	id: string;
	status: string;
	records: {
		id: string;
		status: RecordStatus;
		itemId: string;
	}[];
};

export type Filter = {
	tagIds?: string[];
	locationIds?: string[];
	priceMin?: number;
	priceMax?: number;
	seenItems?: string[];
	targetItems?: string[];
};

export type PlayData = {
	userId: string;
	history: PlayHistory[];
};

export type Food = Awaited<ReturnType<typeof itemService.getItems>>[number];

export type PlayHistory = { itemId: string; status: RecordStatus };
