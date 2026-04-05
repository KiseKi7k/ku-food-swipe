"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Store, ArrowBigUp, ArrowBigDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Post } from "@/service/post.service";
import { votePost } from "@/actions/action";
import { useSession } from "@/lib/authClient";

type PostFeedCardType = Post & { userUpvote: boolean | null };

export function FoodFeedCard({ post }: { post: PostFeedCardType }) {
	const { data } = useSession();
	const [vote, setVote] = useState<boolean | null>(post.userUpvote);

	const handleVote = async (isUpvote: boolean) => {
		setVote((prev) => (prev === isUpvote ? null : isUpvote));
		if (data?.user) {
			await votePost(data?.user.id, post.id, isUpvote);
		}
	};

	const netVotes =
		post.upvotes - post.downvotes + (vote === null ? 0 : vote ? 1 : -1);

	return (
		<Card className="py-0 overflow-hidden border-none shadow-md bg-white">
			<div className="flex">
				{/* Vote column */}
				<div className="flex flex-col items-center p-3 bg-slate-50 border-r border-slate-100">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => handleVote(true)}
						className={`h-8 w-8 rounded-full ${vote === true ? "text-green-600 bg-green-100/50 hover:bg-green-100 hover:text-green-700" : "text-slate-400 hover:text-green-600"}`}
					>
						<ArrowBigUp className="h-5 w-5" />
					</Button>
					<span
						className={`text-sm font-bold my-1 ${vote === true ? "text-green-600" : vote === false ? "text-red-500" : "text-slate-700"}`}
					>
						{netVotes}
					</span>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => handleVote(false)}
						className={`h-8 w-8 rounded-full ${vote === false ? "text-red-500 bg-red-100/50 hover:bg-red-100 hover:text-red-600" : "text-slate-400 hover:text-red-500"}`}
					>
						<ArrowBigDown className="h-5 w-5" />
					</Button>
				</div>

				{/* Content */}
				<div className="flex-1 flex flex-col sm:flex-row">
					<div className="relative w-full sm:w-32 h-48 sm:h-auto shrink-0 bg-slate-100">
						{post.food.image ? (
							<Image
								src={post.food.image}
								alt={post.food.name}
								fill
								className="object-cover"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center text-slate-300">
								ไม่มีรูปภาพ
							</div>
						)}
					</div>
					<div className="p-4 flex-1 flex flex-col justify-between">
						<div>
							<h3 className="font-bold text-lg text-slate-800 leading-tight mb-1">
								{post.food.name}
							</h3>
							<div className="flex items-center text-xs text-slate-500 gap-3 mb-2">
								<div className="flex items-center gap-1">
									<Store className="h-3 w-3" />
									<span>{post.food.shop}</span>
								</div>
								<div className="flex items-center gap-1">
									<MapPin className="h-3 w-3" />
									<span>{post.food.location}</span>
								</div>
							</div>
						</div>
						<div className="flex flex-wrap gap-1 mt-2">
							{post.food.tags.map((tag) => (
								<Badge
									key={tag}
									variant="secondary"
									className="bg-green-50 text-green-700 hover:bg-green-100"
								>
									{tag}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}
