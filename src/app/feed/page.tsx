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

const mockPostData = [
	{
		id: "1",
		downvote: 0,
		upvotes: 6,
		food: {
			name: "ข้าวขาหมู",
			tags: ["อาหารจานเดียว", "ไทย", "ไม่เผ็ด"],
			shop: "ราเมงเส้นสด",
			location: "บาร์ใหม่",
			image: "/foods/rice-pork.png",
		},
	},
	{
		id: "2",
		downvote: 0,
		upvotes: 4,
		food: {
			name: "ข้าวกะเพราไก่ไข่ดาว",
			tags: ["อาหารจานเดียว", "เผ็ด", "ไทย"],
			shop: "เตี๋ยวเรือหน้าเฟือง",
			location: "บาร์วิศวะ",
			image: "/foods/chicken-kharpow.png",
		},
	},
	{
		id: "3",
		downvote: 0,
		upvotes: 1,
		food: {
			name: "ข้าวผัดไก่",
			tags: ["อาหารจานเดียว", "ไทย", "ไม่เผ็ด"],
			shop: "ข้าวมันไก่ช่างกล",
			location: "บาร์วิศวะ",
			image: "/foods/chicken-fried-rice.png",
		},
	},
];

export default async function FeedPage() {
	const data = await auth.api.getSession({ headers: await headers() });
	const postsDB = await getPostsWithVote(data?.user.id);
	const posts = postsDB.map((p, i) => {
		if (i > mockPostData.length - 1) return p;

		const mock = mockPostData[i];
		return {
			...p,
			upvotes: mock.upvotes,
			food: {
				...p.food,
				image: mock.food.image,
			},
		};
	});

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
