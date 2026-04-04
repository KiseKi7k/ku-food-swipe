import { Filter, PlayData } from "@/types/type";
import prisma from "./prisma";
import { bytesToBase64 } from "./utils";

export const itemService = {
	getItems: async (filter: Filter, limit?: number) => {
		const items = await prisma.item.findMany({
			select: {
				food: {
					select: {
						name: true,
						image: true,
						tags: {
							select: {
								name: true,
							},
						},
					},
				},
				shop: {
					select: {
						name: true,
						location: {
							select: {
								name: true,
							},
						},
					},
				},
				id: true,
				priceMin: true,
				priceMax: true,
			},
			where: {
				food: filter.tagIds?.length
					? {
							tags: {
								some: {
									id: { in: filter.tagIds },
								},
							},
						}
					: undefined,

				shop: filter.locationIds?.length
					? {
							location: {
								id: { in: filter.locationIds },
							},
						}
					: undefined,

				AND: [
					filter.priceMin !== undefined
						? { priceMin: { gte: filter.priceMin } }
						: {},
					filter.priceMax !== undefined
						? {
								OR: [
									{ priceMax: { lte: filter.priceMax } },
									{ priceMax: null },
								],
							}
						: {},

					filter.targetItems?.length ? { id: { in: filter.targetItems } } : {},
					filter.seenItems?.length ? { id: { notIn: filter.seenItems } } : {},
				].filter(Boolean),
			},
			take: limit,
		});

		const formattedItems = items.map((item) => ({
			id: item.id,
			name: item.food.name,
			tags: item?.food.tags.map((t) => t.name),
			shop: item?.shop?.name,
			location: item?.shop?.location.name,
			priceMin: item.priceMin,
			priceMax: item.priceMax,
			image: item.food.image
				? `data:image/jpeg;base64,${bytesToBase64(item.food.image)}`
				: null,
		}));

		return formattedItems;
	},

	getItemsInfo: async (limit?: number, page?: number) => {
		const items = await prisma.item.findMany({
			select: {
				id: true,
				food: {
					select: {
						name: true,
						tags: {
							select: {
								name: true,
							},
						},
					},
				},
			},
			take: limit,
			skip: limit && page ? limit * (page - 1) : undefined,
		});

		const formattedItems = items.map((item) => ({
			id: item.id,
			name: item.food.name,
			tags: item?.food.tags.map((t) => t.name),
		}));

		return formattedItems;
	},

	createPlayRecord: async (playData: PlayData) => {
		const userPlay = await prisma.userPlay.create({
			data: {
				userId: playData.userId,
				records: {
					create: playData.history,
				},
			},
			include: {
				records: {
					select: {
						itemId: true,
						status: true,
					},
				},
			},
		});
		return userPlay;
	},
};
