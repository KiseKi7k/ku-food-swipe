"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, MapPin, Store } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface FoodFeedItem {
	id: string;
	name: string;
	shop: string;
	location: string;
	image: string;
	tags: string[];
	upvotes: number;
	downvotes: number;
}

interface FoodFeedCardProps {
	item: FoodFeedItem;
}

export function FoodFeedCard({ item }: FoodFeedCardProps) {
	const [vote, setVote] = useState<"up" | "down" | null>(null);

	const handleVote = (type: "up" | "down") => {
		// // TODO: Connect to upvote/downvote API here
		setVote((prev) => (prev === type ? null : type));
	};

	const netVotes =
		item.upvotes -
		item.downvotes +
		(vote === "up" ? 1 : vote === "down" ? -1 : 0);

	return (
		<Card className="overflow-hidden mb-4 border-none shadow-md bg-white">
			<div className="flex">
				{/* Vote column */}
				<div className="flex flex-col items-center p-3 bg-slate-50 border-r border-slate-100">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => handleVote("up")}
						className={`h-8 w-8 rounded-full ${vote === "up" ? "text-green-600 bg-green-100/50 hover:bg-green-100 hover:text-green-700" : "text-slate-400 hover:text-green-600"}`}
					>
						<ArrowUp className="h-5 w-5" />
					</Button>
					<span
						className={`text-sm font-bold my-1 ${vote === "up" ? "text-green-600" : vote === "down" ? "text-red-500" : "text-slate-700"}`}
					>
						{netVotes}
					</span>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => handleVote("down")}
						className={`h-8 w-8 rounded-full ${vote === "down" ? "text-red-500 bg-red-100/50 hover:bg-red-100 hover:text-red-600" : "text-slate-400 hover:text-red-500"}`}
					>
						<ArrowDown className="h-5 w-5" />
					</Button>
				</div>

				{/* Content */}
				<div className="flex-1 flex flex-col sm:flex-row">
					<div className="relative w-full sm:w-32 h-32 sm:h-auto shrink-0 bg-slate-100">
						{item.image ? (
							<Image
								src={item.image}
								alt={item.name}
								fill
								className="object-cover"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center text-slate-300">
								No Image
							</div>
						)}
					</div>
					<div className="p-4 flex-1 flex flex-col justify-between">
						<div>
							<h3 className="font-bold text-lg text-slate-800 leading-tight mb-1">
								{item.name}
							</h3>
							<div className="flex items-center text-xs text-slate-500 gap-3 mb-2">
								<div className="flex items-center gap-1">
									<Store className="h-3 w-3" />
									<span>{item.shop}</span>
								</div>
								<div className="flex items-center gap-1">
									<MapPin className="h-3 w-3" />
									<span>{item.location}</span>
								</div>
							</div>
						</div>
						<div className="flex flex-wrap gap-1 mt-2">
							{item.tags.map((tag) => (
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
