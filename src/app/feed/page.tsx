import { FoodFeedCard, FoodFeedItem } from "@/components/feed/FoodFeedCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Mock data
const mockFeed: FoodFeedItem[] = [
	{
		id: "1",
		name: "Krapow Moo Saap",
		shop: "Auntie's Kitchen",
		location: "KU Food Court 1",
		image: "",
		tags: ["Thai", "Spicy", "Pork"],
		upvotes: 120,
		downvotes: 5,
	},
	{
		id: "2",
		name: "Khaoman Gai",
		shop: "Gai Yang Bangsean",
		location: "KU Food Court 2",
		image: "",
		tags: ["Thai", "Chicken"],
		upvotes: 85,
		downvotes: 12,
	},
];

export default function FeedPage() {
	// // TODO: Fetch feed data from DB
	return (
		<div className="min-h-screen bg-slate-50 pb-20">
			<main className="container max-w-2xl mx-auto px-4 pt-6">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-2xl font-bold tracking-tight text-slate-900">
							Food Feed
						</h1>
						<p className="text-sm text-slate-500">
							Vote on community food suggestions!
						</p>
					</div>
					<Link href="/feed/create">
						<Button className="bg-green-600 hover:bg-green-700 shadow-md shadow-green-200">
							<Plus className="h-4 w-4 mr-2" />
							Create
						</Button>
					</Link>
				</div>

				<div className="space-y-4">
					{mockFeed.map((item) => (
						<FoodFeedCard key={item.id} item={item} />
					))}
				</div>
			</main>
		</div>
	);
}
