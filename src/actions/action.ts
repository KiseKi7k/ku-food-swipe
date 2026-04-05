"use server";

import prisma from "@/lib/prisma";
import { itemService } from "@/service/item.service";
import { createPostBody, postService } from "@/service/post.service";
import { PlayData } from "@/types/type";
import { revalidateTag, unstable_cache } from "next/cache";

export const getFilterData = unstable_cache(
	async () => {
		const tags = await prisma.tag.findMany({
			select: {
				id: true,
				name: true,
			},
		});

		const locations = await prisma.location.findMany({
			select: {
				id: true,
				name: true,
			},
		});

		return {
			tags,
			locations,
		};
	},
	["filter-data"],
	{
		revalidate: 60 * 60,
	},
);

export const createPlayRecord = async (playData: PlayData) => {
	const userPlay = await itemService.createPlayRecord(playData);
	console.log(userPlay);
	return userPlay;
};

export const createPost = async (userId: string, data: createPostBody) => {
	const post = await postService.createPost(userId, data);
	revalidateTag("feed-posts", "max");
	return post;
};

export const votePost = async (
	userId: string,
	postId: string,
	isUpvote: boolean,
) => {
	const vote = await postService.votePosts(userId, postId, isUpvote);
	console.log(vote);
	return vote;
};
