"use client";

import { Dispatch, SetStateAction } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { FilterData } from "./ClientHome";

interface FilterProps {
	filters: {
		tagIds: string[];
		locationIds: string[];
		priceRange: [number, number];
	};
	setFilter: Dispatch<
		SetStateAction<{
			tagIds: string[];
			locationIds: string[];
			priceRange: [number, number];
		}>
	>;

	filterData: FilterData;
}

export function Filter({ filters, setFilter, filterData }: FilterProps) {
	const toggleTag = (id: string) => {
		setFilter((prev) => ({
			...prev,
			tagIds: prev.tagIds.includes(id)
				? prev.tagIds.filter((t) => t !== id)
				: [...prev.tagIds, id],
		}));
	};

	const toggleLocation = (id: string) => {
		setFilter((prev) => ({
			...prev,
			locationIds: prev.locationIds.includes(id)
				? prev.locationIds.filter((t) => t !== id)
				: [...prev.locationIds, id],
		}));
	};

	const handleReset = () => {
		setFilter({ tagIds: [], locationIds: [], priceRange: [0, 100] });
	};

	const handleSlider = ([min, max]: [number, number]) => {
		if (min >= max) return;
		setFilter((prev) => ({ ...prev, priceRange: [min, max] }));
	};

	return (
		<Card className="w-full border-none shadow-none bg-transparent">
			<CardHeader className="px-0 pt-0">
				<div className="flex items-center justify-between">
					<CardTitle className="text-lg font-semibold text-slate-800">
						Filter อาหาร
					</CardTitle>
					<Button
						variant="ghost"
						size="sm"
						onClick={handleReset}
						className="text-slate-500 hover:text-green-600"
					>
						Reset
					</Button>
				</div>
			</CardHeader>
			<CardContent className="px-0 space-y-8">
				{/* Categories / Tags */}
				<div className="space-y-3">
					<Label className="text-sm font-medium text-slate-600">หมวดหมู่</Label>
					<div className="flex flex-wrap gap-2">
						{filterData.tags.map((tag) => (
							<Badge
								key={tag.id}
								variant={
									filters.tagIds.includes(tag.id) ? "default" : "outline"
								}
								className={`cursor-pointer px-3 py-1 text-sm font-normal transition-all ${
									filters.tagIds.includes(tag.id)
										? "bg-green-600 hover:bg-green-700 text-white border-transparent"
										: "bg-white hover:border-green-300 text-slate-600"
								}`}
								onClick={() => toggleTag(tag.id)}
							>
								{tag.name}
								{filters.tagIds.includes(tag.id) && (
									<X className="ml-1 h-3 w-3 inline-block" />
								)}
							</Badge>
						))}
					</div>
				</div>

				{/* Locations */}
				<div className="space-y-3">
					<Label className="text-sm font-medium text-slate-600">ร้านค้า</Label>
					<div className="flex flex-wrap gap-2">
						{filterData.locations.map((location) => (
							<Badge
								key={location.id}
								variant={
									filters.locationIds.includes(location.id)
										? "default"
										: "outline"
								}
								className={`cursor-pointer px-3 py-1 text-sm font-normal transition-all ${
									filters.locationIds.includes(location.id)
										? "bg-green-600 hover:bg-green-700 text-white border-transparent"
										: "bg-white hover:border-green-300 text-slate-600"
								}`}
								onClick={() => toggleLocation(location.id)}
							>
								{location.name}
							</Badge>
						))}
					</div>
				</div>

				{/* Price Range */}
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<Label className="text-sm font-medium text-slate-600">
							ช่วงราคา
						</Label>
						<span className="text-sm font-semibold text-green-700">
							฿{filters.priceRange[0]} - ฿{filters.priceRange[1]}
						</span>
					</div>
					<Slider
						defaultValue={[0, 500]}
						max={500}
						step={5}
						value={filters.priceRange}
						onValueChange={(val) => handleSlider(val as [number, number])}
						className="**:[role=slider]:bg-green-600 **:[role=slider]:border-green-600"
					/>
				</div>
			</CardContent>
		</Card>
	);
}
