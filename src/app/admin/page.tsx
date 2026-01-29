"use client";

import { useState, DragEvent, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FoodItem } from "../type/food";
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [imageUrl, setImageUrl] = useState(false);
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);

  const [shops, setShops] = useState([]);
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");




  useEffect(() => {
    const fetchShops = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/shop/list');
        if (!response.ok) throw new Error('Failed to fetch shops');

        const data = await response.json();
        setShops(data.data);
        // console.log("Fetched shops:", data.data);
      } catch (err) {
        setError("error fetching shops");
      }
    };

    fetchShops();
  }, []);
  const fetchItems = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/item/list');
      if (!response.ok) throw new Error('Failed to fetch items');

      const data = await response.json();
      setItems(data.data);
      // console.log("Fetched items:", data.data[0].Shop.Name); 
    } catch (err) {
      setError("error fetching shops");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {


    fetchItems();
  }, []);


  if (loading) return <p className="text-sm text-slate-400">กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="text-sm text-red-500">เกิดข้อผิดพลาด: {error}</p>;

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    console.log(objectUrl);
    setNewFood((prev) => ({ ...prev, image: objectUrl }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleAddFood = async (e: FormEvent) => {
    e.preventDefault();
    if (!newFood.name || !newFood.price || !newFood.shop) return;

    try {

      if (!selectedFile) { return alert("Please select a file"); }
      // 1. Prepare FormData
      let formData = new FormData();
      formData.append("image", selectedFile);
      // Append the food details
      formData.append("price", newFood.price!.toString());
      formData.append("Name", newFood.name);
      formData.append("tags", tagsSelected.join(","));
      formData.append("shopId", newFood.shop);
      console.log("FormData Name:", formData);
      // 2. Upload to API
      const res = await fetch("/api/item", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Failed to upload");
      }

      const data = await res.json();
      const newId = data.id;

      setNewFood({ name: "", price: 0, tags: [], shop: "", image: "" });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error adding food:", error);
      alert("Error adding food");
    }
  };

  const handleDeleteFood = async (id: string) => {

    if (confirm("Are you sure you want to delete this item?")) {
      const res = await fetch(`/api/item/delete/${id}`, {
          method: "DELETE",
        });
        if(res.ok){fetchItems();}
    

    }
  };

  const toggleTag = (tag: string) => {
    setNewFood((prev) => {
      const tags = prev.tags || [];
      const nextTags = tags.includes(tag)
        ? tags.filter((t) => t !== tag)
        : [...tags, tag];

      // Log the result here before returning
      console.log("Updated Tags:", nextTags);
      setTagsSelected(nextTags)
      return {
        ...prev,
        tags: nextTags,
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
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
                        <option value="">เลือกร้านค้า</option>
                        {shops.map((shop) => (

                          // Use shop.id for the keyvalue and shop.name for the label
                          <option key={shop['id'] || shop} value={shop['id'] || shop}>
                            {shop['Name'] || shop}
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
                          className={`cursor-pointer px-4 py-1.5 text-sm transition-all ${newFood.tags?.includes(tag)
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
                    className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center transition-all ${dragActive
                      ? "border-green-500 bg-green-50"
                      : "border-slate-200 bg-slate-50"
                      }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {newFood.image ? (
                      <div className="relative w-full h-full group">
                        <img src={newFood.image} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl cursor-pointer" onClick={() => {
                          setNewFood({ ...newFood, image: "" });
                          setSelectedFile(null);
                        }}>
                          <Trash2 className="text-white h-8 w-8" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative group border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center overflow-hidden">
                          {/* Icon Circle */}
                          <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                            <Upload className="h-6 w-6 text-slate-400" />
                          </div>

                          {/* Text Info */}
                          <p className="text-sm font-medium text-slate-600">
                            Drag & Drop
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            หรือคลิกเพื่อเลือกไฟล์
                          </p>

                          {/* The Hidden Input & Full-Box Label */}
                          <label htmlFor="file-upload" className="cursor-pointer inset-0 absolute" />

                        </div>

                        <Input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={onFileChange}
                        />
                      </>
                    )}
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
                    {items && items?.slice(0, 20).map((food) => (
                      <tr
                        key={food['id']}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg overflow-hidden bg-slate-100">
                              <img
                                src={food.food?.image || ""}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="font-medium text-slate-800">
                              {food.food?.foodName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          <div className="flex items-center gap-2">
                            <StoreIcon className="h-4 w-4" />
                            {food.shop?.name ? food.shop?.name : "ไม่มีร้านค้า"}

                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">
                          ฿{food.priceMin}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {food.food?.tags?.map((tag) => (
                              <Badge
                                key={tag.id}
                                variant="secondary"
                                className="px-2 py-0 text-[10px] font-normal"
                              >
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteFood(food['id'])}
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
