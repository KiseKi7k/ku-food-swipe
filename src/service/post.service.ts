import prisma from "@/lib/prisma";
import { getImageBase64 } from "@/lib/utils";

export type createPostBody = {
	priceMin: number;
	priceMax?: number;
	shopId: string;
} & (
	| {
			createFood: false;
			foodId: string;
			image?: string;
	  }
	| {
			createFood: true;
			foodName: string;
			tags: string[];
			image: string;
	  }
);

export type Post = {
	id: string;
	upvotes: number;
	downvotes: number;
	food: {
		name: string;
		tags: string[];
		shop: string;
		location: string;
		image: string | null;
	};
	creator: {
		id: string;
		name: string;
		image: string | null;
	};
	createdAt: Date;
};

type ErrorType = {
	success: false;
	message: string;
};

export const postService = {
	createPost: async (
		userId: string,
		data: createPostBody,
	): Promise<Post | ErrorType> => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: userId },
			});

			if (!user) throw new Error("User not found");

			const result = await prisma.$transaction(async (tx) => {
				let food;

				if (data.createFood) {
					const imageBuffer = Buffer.from(data.image, "base64");
					food = await tx.food.create({
						data: {
							name: data.foodName,
							image: imageBuffer,
							tags: {
								connectOrCreate: data.tags.map((tagName) => ({
									where: { name: tagName },
									create: { name: tagName },
								})),
							},
						},
						include: {
							tags: { select: { name: true } },
						},
					});
				} else {
					food = await tx.food.findUnique({
						where: { id: data.foodId },
						include: {
							tags: { select: { name: true } },
						},
					});

					if (!food) throw new Error("Food not found");
				}

				const itemImageBuffer = data.image
					? Buffer.from(data.image, "base64")
					: undefined;
				const item = await tx.item.create({
					data: {
						priceMin: data.priceMin,
						priceMax: data.priceMax,
						shopId: data.shopId,
						foodId: food.id,
						image: itemImageBuffer,
					},
					include: {
						shop: {
							select: {
								name: true,
								location: { select: { name: true } },
							},
						},
					},
				});

				const post = await tx.post.create({
					data: {
						creatorId: userId,
						itemId: item.id,
					},
					include: {
						creator: {
							select: {
								id: true,
								name: true,
								image: true,
							},
						},
					},
				});

				return {
					...post,
					food: {
						name: food.name,
						tags: food.tags.map((t) => t.name),
						shop: item.shop.name,
						location: item.shop.location.name,
						image: item.image
							? getImageBase64(item.image)
							: food.image
								? getImageBase64(food.image)
								: null,
					},
					upvotes: 0,
					downvotes: 0,
				};
			});

			return result;
		} catch (e) {
			console.log(e);
			const message = e instanceof Error ? e.message : (e as string);
			return { success: false, message };
		}
	},
	getPosts: async (): Promise<Post[]> => {
		const posts = await prisma.post.findMany({
			where: {
				archived: false,
			},
			include: {
				creator: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
				item: {
					select: {
						priceMin: true,
						priceMax: true,
						image: true,
						shop: {
							select: {
								name: true,
								location: { select: { name: true } },
							},
						},
						food: {
							select: {
								name: true,
								image: true,
								tags: { select: { name: true } },
							},
						},
					},
				},
			},
			orderBy: { createdAt: "desc" },
		});

		const postsVote = await prisma.vote.groupBy({
			by: ["postId", "upvote"],
			where: {
				post: { archived: false },
			},
			_count: true,
		});

		const voteMap = new Map<string, { upvotes: number; downvotes: number }>();
		postsVote.forEach((p) => {
			const existing = voteMap.get(p.postId) ?? { upvotes: 0, downvotes: 0 };

			if (p.upvote) existing.upvotes = p._count;
			else existing.downvotes = p._count;

			voteMap.set(p.postId, existing);
		});

		const formattedPost = posts.map((p) => {
			const votes = voteMap.get(p.id) ?? { upvotes: 0, downvotes: 0 };
			const food = p.item.food;

			return {
				id: p.id,
				createdAt: p.createdAt,
				...votes,
				food: {
					name: food.name,
					tags: food.tags.map((t) => t.name),
					shop: p.item.shop.name,
					location: p.item.shop.location.name,
					image: p.item.image
						? getImageBase64(p.item.image)
						: food.image
							? getImageBase64(food.image)
							: null,
				},
				creator: p.creator,
			};
		});
		return formattedPost;
	},
	votePosts: async (userId: string, postId: string, isUpvote: boolean) => {
		// If user didn't vote yet -> create vote
		// If user already vote and vote the same -> delete vote
		// If user vote different -> modify vote

		try {
			const user = await prisma.user.findUnique({ where: { id: userId } });
			if (!user) throw new Error("User not found");

			const existingVote = await prisma.vote.findUnique({
				where: {
					userId_postId: { userId, postId },
				},
			});

			// If user didn't vote yet -> create vote
			if (!existingVote) {
				const vote = await prisma.vote.create({
					data: { userId, postId, upvote: isUpvote },
				});

				return { success: true, vote };
			}
			// If user already vote and vote the same -> delete vote
			if (existingVote.upvote === isUpvote) {
				await prisma.vote.delete({
					where: { id: existingVote.id },
				});

				return { success: true, vote: null };
			}

			// If user vote different -> modify vote
			const vote = await prisma.vote.update({
				where: { id: existingVote.id },
				data: { upvote: isUpvote },
			});

			return { success: true, vote };
		} catch (e) {
			console.log(e);
			const message = e instanceof Error ? e.message : (e as string);
			return { success: false, message };
		}
	},
};
