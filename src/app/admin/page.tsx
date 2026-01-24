"use client";

import { useState, DragEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Trash2,
  Upload,
  Utensils,
  Store as StoreIcon,
  Tag,
} from "lucide-react";
import { mockFoods } from "@/utils/food/mock";
import { Food } from "@/types/food";

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

export default function AdminPage() {
  const [foods, setFoods] = useState<Food[]>(mockFoods);
  const [newFood, setNewFood] = useState<Partial<Food>>({
    name: "",
    price: 0,
    tags: [],
    shop: "",
    image: "",
  });
  const [dragActive, setDragActive] = useState(false);

  const handleAddFood = (e: FormEvent) => {
    e.preventDefault();
    if (!newFood.name || !newFood.price || !newFood.shop) return;

    const foodToAdd: Food = {
      id: `food-${foods.length + 1}`,
      name: newFood.name!,
      price: Number(newFood.price),
      tags: newFood.tags || [],
      shop: newFood.shop!,
      image:
        newFood.image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    };

    setFoods([foodToAdd, ...foods]);
    setNewFood({ name: "", price: 0, tags: [], shop: "", image: "" });
  };

  const handleDeleteFood = (id: string) => {
    setFoods(foods.filter((f) => f.id !== id));
  };

  const toggleTag = (tag: string) => {
    setNewFood((prev) => {
      const tags = prev.tags || [];
      return {
        ...prev,
        tags: tags.includes(tag)
          ? tags.filter((t) => t !== tag)
          : [...tags, tag],
      };
    });
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // In a real app, you'd handle the file upload here
    // For mock, we'll just show a notification or placeholder
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
          <Utensils className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">CMS Management</h1>
          <p className="text-slate-500">จัดการข้อมูลอาหารและหมวดหมู่</p>
        </div>
      </div>

      <Tabs defaultValue="add-food" className="space-y-8">
        <TabsList className="bg-slate-100 p-1 rounded-xl">
          <TabsTrigger value="add-food" className="rounded-lg px-6">
            เพิ่มอาหารใหม่
          </TabsTrigger>
          <TabsTrigger value="manage-foods" className="rounded-lg px-6">
            จัดการรายการอาหาร
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add-food">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-2 border-none shadow-xl shadow-slate-100 rounded-3xl overflow-hidden">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-lg">รายละเอียดอาหาร</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleAddFood} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">ชื่ออาหาร</Label>
                    <Input
                      id="name"
                      placeholder="เช่น ข้าวมันไก่"
                      value={newFood.name}
                      onChange={(e) =>
                        setNewFood({ ...newFood, name: e.target.value })
                      }
                      className="rounded-xl h-12"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">ราคา (บาท)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0"
                        value={newFood.price || ""}
                        onChange={(e) =>
                          setNewFood({
                            ...newFood,
                            price: Number(e.target.value),
                          })
                        }
                        className="rounded-xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shop">ร้านค้า</Label>
                      <select
                        id="shop"
                        className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={newFood.shop}
                        onChange={(e) =>
                          setNewFood({ ...newFood, shop: e.target.value })
                        }
                      >
                        <option value="">เลือกรานค้า</option>
                        {SHOPS.map((shop) => (
                          <option key={shop} value={shop}>
                            {shop}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>หมวดหมู่</Label>
                    <div className="flex flex-wrap gap-2">
                      {TAG_OPTIONS.map((tag) => (
                        <Badge
                          key={tag}
                          variant={
                            newFood.tags?.includes(tag) ? "default" : "outline"
                          }
                          className={`cursor-pointer px-4 py-1.5 text-sm transition-all ${
                            newFood.tags?.includes(tag)
                              ? "bg-green-600 border-transparent"
                              : "hover:border-green-400"
                          }`}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-green-600 hover:bg-green-700 rounded-2xl text-lg font-bold shadow-lg shadow-green-100"
                  >
                    <Plus className="mr-2 h-5 w-5" /> เพิ่มรายการอาหาร
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-none shadow-xl shadow-slate-100 rounded-3xl overflow-hidden">
                <CardHeader className="bg-slate-50 border-b">
                  <CardTitle className="text-lg">รูปภาพอาหาร</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div
                    className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center transition-all ${
                      dragActive
                        ? "border-green-500 bg-green-50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                      <Upload className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-600">
                      Drag & Drop
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      หรือคลิกเพื่อเลือกไฟล์
                    </p>
                    <Input type="file" className="hidden" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl shadow-slate-100 rounded-3xl overflow-hidden bg-green-600 text-white">
                <CardContent className="p-6 space-y-4">
                  <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg leading-tight">
                    เพิ่มความหลากหลายให้นิสิต!
                  </h3>
                  <p className="text-green-50 text-sm">
                    การเพิ่มข้อมูลที่ครบถ้วนทั้งราคาและหมวดหมู่
                    จะช่วยให้การสุ่มตรงใจผู้ใช้มากขึ้น
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="manage-foods">
          <Card className="border-none shadow-xl shadow-slate-100 rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b">
                      <th className="px-6 py-4 font-semibold text-slate-600">
                        อาหาร
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-600">
                        ร้านค้า
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-600">
                        ราคา
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-600">
                        หมวดหมู่
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-600">
                        จัดการ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {foods.slice(0, 20).map((food) => (
                      <tr
                        key={food.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg overflow-hidden bg-slate-100">
                              <img
                                src={food.image}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="font-medium text-slate-800">
                              {food.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          <div className="flex items-center gap-2">
                            <StoreIcon className="h-4 w-4" />
                            {food.shop}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">
                          ฿{food.price}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {food.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="px-2 py-0 text-[10px] font-normal"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteFood(food.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {foods.length > 20 && (
                <div className="p-4 text-center border-t bg-slate-50">
                  <p className="text-sm text-slate-500">
                    แสดง 20 รายการล่าสุดจากทั้งหมด {foods.length} รายการ
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Reuse Sparkles from Home for the small card
function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M3 5h4" />
      <path d="M21 17v4" />
      <path d="M19 19h4" />
    </svg>
  );
}
