"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowLeft, Upload, Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function FeedCreatePage() {
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState("");

	const handleAddTag = () => {
		if (tagInput.trim() && !tags.includes(tagInput.trim())) {
			setTags([...tags, tagInput.trim()]);
			setTagInput("");
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// // TODO: Implement submit to DB and handle image upload
		alert("Food suggestion submitted! (Mock)");
	};

	return (
		<div className="min-h-screen bg-slate-50 pb-20">
			<main className="container max-w-lg mx-auto px-4 pt-6">
				<Link
					href="/feed"
					className="inline-flex items-center text-sm text-green-600 font-medium mb-6 hover:text-green-700"
				>
					<ArrowLeft className="h-4 w-4 mr-1" />
					Back to Feed
				</Link>

				<div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
					<div className="p-6 bg-green-600 text-white">
						<h1 className="text-2xl font-bold">Create New Food</h1>
						<p className="text-green-100 mt-1">
							Suggest food for the community to vote on
						</p>
					</div>

					<form onSubmit={handleSubmit} className="p-6 space-y-5">
						<div className="space-y-2">
							<Label htmlFor="name">Food Name</Label>
							<Input
								id="name"
								required
								placeholder="e.g. Krapow Moo Saap"
								className="focus-visible:ring-green-600"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="priceMin">Min Price (฿)</Label>
								<Input
									id="priceMin"
									type="number"
									placeholder="Optional"
									className="focus-visible:ring-green-600"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="priceMax">Max Price (฿)</Label>
								<Input
									id="priceMax"
									type="number"
									placeholder="Optional"
									className="focus-visible:ring-green-600"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="shop">Shop Name</Label>
							<Input
								id="shop"
								required
								placeholder="e.g. Auntie's Kitchen"
								className="focus-visible:ring-green-600"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="location">Location</Label>
							<Input
								id="location"
								required
								placeholder="e.g. KU Food Court 1"
								className="focus-visible:ring-green-600"
							/>
						</div>

						<div className="space-y-2">
							<Label>Upload Image</Label>
							<div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer">
								<Upload className="h-8 w-8 mb-2 text-green-500" />
								<span className="text-sm">Click to upload image</span>
								<input type="file" className="hidden" accept="image/*" />
							</div>
						</div>

						<div className="space-y-2">
							<Label>Tags</Label>
							<div className="flex gap-2">
								<Input
									value={tagInput}
									onChange={(e) => setTagInput(e.target.value)}
									onKeyDown={(e) =>
										e.key === "Enter" && (e.preventDefault(), handleAddTag())
									}
									placeholder="Add tags (e.g. Thai, Spicy)"
									className="focus-visible:ring-green-600"
								/>
								<Button
									type="button"
									onClick={handleAddTag}
									className="bg-green-600 hover:bg-green-700"
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>
							<div className="flex flex-wrap gap-2 mt-2">
								{tags.map((tag) => (
									<Badge
										key={tag}
										variant="secondary"
										className="bg-green-100 text-green-800"
										onClick={() => setTags(tags.filter((t) => t !== tag))}
									>
										{tag} &times;
									</Badge>
								))}
							</div>
						</div>

						<Button
							type="submit"
							className="w-full bg-green-600 hover:bg-green-700 mt-6 shadow-md shadow-green-200 h-12 text-lg"
						>
							Submit Suggestion
						</Button>
					</form>
				</div>
			</main>
		</div>
	);
}
