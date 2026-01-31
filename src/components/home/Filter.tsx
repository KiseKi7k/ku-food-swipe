"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import type { Location, Tag } from "@/types/other";

interface FilterProps {
  onFilterChange: (filters: {
    tags: string[];
    shops: string[];
    priceRange: [number, number];
  }) => void;
}

export function Filter({ onFilterChange }: FilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedShops, setSelectedShops] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const [tags, setTags] = useState<Tag[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  // Display tags and location on start (may cache this)
  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch("/api/tag");
      const data = await response.json();
      setTags(data.data);
    };
    const fetchLocations = async () => {
      const response = await fetch("/api/location");
      const data = await response.json();
      setLocations(data.data);
    };
    fetchLocations();
    fetchTags();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const toggleShop = (shop: string) => {
    setSelectedShops((prev) =>
      prev.includes(shop) ? prev.filter((s) => s !== shop) : [...prev, shop],
    );
  };

  const handleReset = () => {
    setSelectedTags([]);
    setSelectedShops([]);
    setPriceRange([0, 500]);
  };

  const handleSlider = ([min, max]: [number, number]) => {
    if (min >= max) return;
    setPriceRange([min, max]);
  };

  useEffect(() => {
    onFilterChange({ tags: selectedTags, shops: selectedShops, priceRange });
  }, [selectedTags, selectedShops, priceRange, onFilterChange]);

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
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                className={`cursor-pointer px-3 py-1 text-sm font-normal transition-all ${
                  selectedTags.includes(tag.id)
                    ? "bg-green-600 hover:bg-green-700 text-white border-transparent"
                    : "bg-white hover:border-green-300 text-slate-600"
                }`}
                onClick={() => toggleTag(tag.id)}
              >
                {tag.name}
                {selectedTags.includes(tag.id) && (
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
            {locations.map((location) => (
              <Badge
                key={location.id}
                variant={
                  selectedShops.includes(location.id) ? "default" : "outline"
                }
                className={`cursor-pointer px-3 py-1 text-sm font-normal transition-all ${
                  selectedShops.includes(location.id)
                    ? "bg-green-600 hover:bg-green-700 text-white border-transparent"
                    : "bg-white hover:border-green-300 text-slate-600"
                }`}
                onClick={() => toggleShop(location.id)}
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
              ฿{priceRange[0]} - ฿{priceRange[1]}
            </span>
          </div>
          <Slider
            defaultValue={[0, 500]}
            max={500}
            step={5}
            value={priceRange}
            onValueChange={(val) => handleSlider(val as [number, number])}
            className="**:[role=slider]:bg-green-600 **:[role=slider]:border-green-600"
          />
        </div>
      </CardContent>
    </Card>
  );
}
