import prisma from "@/lib/prisma";

const getUserInfo = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			userPlays: {
				select: {
					id: true,
					createdAt: true,
					records: {
						where: { status: "EAT" },
						take: 1,
						select: {
							item: {
								select: {
									food: {
										select: {
											name: true,
										},
									},
								},
							},
						},
					},
				},
				orderBy: { createdAt: "desc" },
				take: 3,
			},
		},
	});

	const recentPlayIds = user?.userPlays.map((u) => u.id);

	const recentStatusCount = await prisma.record.groupBy({
		by: ["userPlayId", "status"],
		where: {
			userPlayId: { in: recentPlayIds },
			status: { in: ["DISLIKE", "LIKE"] },
		},
		_count: true,
	});

	const statusMap = new Map();
	for (const s of recentStatusCount) {
		statusMap.set(`${s.userPlayId}_${s.status}`, s._count);
	}

	const userRecentPlay = user?.userPlays.map((play) => ({
		id: play.id,
		createdAt: play.createdAt,
		food: play.records[0]?.item?.food?.name ?? null,
		likeCount: statusMap.get(`${play.id}_LIKE`) ?? 0,
		dislikeCount: statusMap.get(`${play.id}_DISLIKE`) ?? 0,
	}));

	const totalStatusCount = await prisma.record.groupBy({
		by: ["status"],
		where: {
			userPlays: {
				userId,
			},
		},
		_count: true,
	});

	const playCount = await prisma.userPlay.count();

	const preference = await getUserPreference(userId);

	return {
		...user,
		userPlays: userRecentPlay,
		likeCount: totalStatusCount.find((s) => s.status === "LIKE")?._count || 0,
		dislikeCount:
			totalStatusCount.find((s) => s.status === "DISLIKE")?._count || 0,
		playCount,
		...preference,
	};
};

const getUserPreference = async (userId: string) => {
	const favoriteTags: { name: string; count: bigint }[] =
		await prisma.$queryRaw`
		SELECT t.name AS name, COUNT(*) AS count
		FROM "Record" r
		JOIN "UserPlay" up on up.id = r.user_play_id
		JOIN "Item" i on i.id = r."itemId"
		JOIN "Food" f on f.id = i.food_id
		JOIN "_foodsToTags" ft on ft."A" = f.id
		JOIN "Tag" t on t.id = ft."B"
		WHERE r.status IN ('LIKE', 'EAT') AND up.user_id = ${userId}
		GROUP BY t.name
		ORDER BY count DESC
		LIMIT 10
	`;

	const favoriteFoods: { name: string; count: bigint }[] =
		await prisma.$queryRaw`
		SELECT f.name AS name, COUNT(*) AS count
		FROM "Record" r
		JOIN "UserPlay" up on up.id = r.user_play_id
		JOIN "Item" i on i.id = r."itemId"
		JOIN "Food" f on f.id = i.food_id
		WHERE r.status IN ('LIKE', 'EAT') AND up.user_id = ${userId}
		GROUP BY f.name
		ORDER BY count DESC
		LIMIT 10
	`;

	return {
		favoriteTags: favoriteTags.map((t) => ({ ...t, count: Number(t.count) })),
		favoriteFoods: favoriteFoods.map((f) => ({ ...f, count: Number(f.count) })),
	};
};

export const userService = {
	getUserInfo,
};
