import { FoodFeedCard } from "@/components/feed/FoodFeedCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { postService } from "@/service/post.service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unstable_cache } from "next/cache";

const getPosts = unstable_cache(
	async () => {
		return await postService.getPosts();
	},
	["feed-posts"],
	{ revalidate: 30, tags: ["feed-posts"] },
);

const getPostsWithVote = async (userId: string | undefined) => {
	const posts = await getPosts();
	if (!userId)
		return posts.map((p) => ({
			...p,
			userUpvote: null,
		}));

	const postIds = posts.map((p) => p.id);

	const userVotes = await postService.getPostVote(userId, postIds);
	return posts.map((p) => ({
		...p,
		userUpvote: userVotes.find((v) => v.postId === p.id)?.upvote ?? null,
	}));
};

export default async function FeedPage() {
	const data = await auth.api.getSession({ headers: await headers() });
	const posts = await getPostsWithVote(data?.user.id);

	return (
		<div className="min-h-screen bg-slate-50 pb-20">
			<main className="container max-w-2xl mx-auto px-4 pt-6">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-2xl font-bold tracking-tight text-slate-900">
							Food Vote
						</h1>
						<p className="text-sm text-slate-500">โหวตให้กับเมนูที่คุณชอบ!</p>
					</div>
					<div className="flex flex-row items-center gap-2">
						<p className="text-gray-500 text-sm">ไม่มีเมนูที่ถูกใจ ?</p>
						<Link href="/feed/create">
							<Button className="bg-green-600 hover:bg-green-700 shadow-md shadow-green-200">
								<Plus className="h-4 w-4 mr-2" />
								สร้าง
							</Button>
						</Link>
					</div>
				</div>

				<div className="space-y-4">
					{posts.map((p) => (
						<FoodFeedCard key={p.id} post={p} />
					))}
				</div>
			</main>
		</div>
	);
}
