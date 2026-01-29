"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

const TAG_OPTIONS = [
  "ข้าว",
  "ปลา",
  "หมู",
  "ไก่",
  "ผัก",
  "น้ำ",
  "ของหวาน",
  "ก๋วยเตี๋ยว",
  "เผ็ด",
  "เส้น",
];
const SHOPS = [
  "ร้านลุงหนวด",
  "ครัวเจ๊เหมียว",
  "KU Food Court",
  "ร้านป้าข้างหอ",
  "The Greenery",
  "สวนอาหารเกษตร",
  "โรงอาหารกลาง",
  "ร้านอาหารใบหน้า",
  "ร้านน้องมุก",
  "ครัวนิสิต",
];

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
            {TAG_OPTIONS.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer px-3 py-1 text-sm font-normal transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-green-600 hover:bg-green-700 text-white border-transparent"
                    : "bg-white hover:border-green-300 text-slate-600"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <X className="ml-1 h-3 w-3 inline-block" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Shops */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-600">ร้านค้า</Label>
          <div className="flex flex-wrap gap-2">
            {SHOPS.map((shop) => (
              <Badge
                key={shop}
                variant={selectedShops.includes(shop) ? "default" : "outline"}
                className={`cursor-pointer px-3 py-1 text-sm font-normal transition-all ${
                  selectedShops.includes(shop)
                    ? "bg-green-600 hover:bg-green-700 text-white border-transparent"
                    : "bg-white hover:border-green-300 text-slate-600"
                }`}
                onClick={() => toggleShop(shop)}
              >
                {shop}
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
