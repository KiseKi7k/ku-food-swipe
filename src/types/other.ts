import { RecordStatus } from "@/generated/enums";

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

export type PlayHistory = { itemId: string; status: RecordStatus };
