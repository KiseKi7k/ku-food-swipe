"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { mockFoods } from "@/utils/food/mock";
import { FoodCard } from "@/components/swipe/FoodCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { checkCookie } from "../utils/checkCookie";
import {
  RefreshCcw,
  Home as HomeIcon,
  CheckCircle2,
  Heart,
  UtensilsCrossed,
  X,
} from "lucide-react";
import Link from "next/link";
import { RecordStatus } from "@/generated/enums"; // Use generated Enum
import { Food, SwipeHistory } from "@/types/food";
import { FoodItem } from "../type/food";
import { it } from "node:test";

export default function SwipePage() {


  // const [foods, setFoods] = useState(mockFoods);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<SwipeHistory[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  // const [items, setItems] = useState<FoodItem[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);



  /* 
   * FETCH FUNCTION 
   * Accepts an offset (skip) to load subsequent pages.
   */
  const fetchItems = async (offset: number) => {
    setIsLoading(true);
    try {
      // Fetch starting at 'offset'
      const response = await fetch(`/api/play/list/${offset}`);
      if (!response.ok) throw new Error('Failed to fetch items');

      const data = await response.json();
      const formatted: Food[] = data.data.map((item: FoodItem) => ({
        id: item.id,
        name: item.food?.foodName || "Unknown",
        price: item.priceMin || 0,
        shop: item.shop?.name || "Unknown Shop",
        // Important: Convert Bytes/Buffer to Base64 string for the <img> tag
        image: item.food?.image
          ? item.food.image
          : "/placeholder.jpg",
        // Flatten the tags: from [{id: 1, Name: "Tag"}] to ["Tag"]
        tags: item.food?.tags?.map((t: any) => t.name) || [],
      }));

      console.log(`Fetched ${formatted.length} items at offset ${offset}`);

      // If we got items, append them. 
      // Note: If offset is 0, we could overwrite, but appending to empty is same.
      // However, for safety if this is called elsewhere, we follow logic:
      setFoods(prev => [...prev, ...formatted]);

    } catch (err) {
      console.error(err);
      setError("error fetching shops");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    // Start from 0
    fetchItems(0);

    return () => {
      if (swipeBufferRef.current.length > 0) {
        flushBuffer();
      }
    };
  }, []);

  // Buffer for batching swipe records
  const swipeBufferRef = useRef<any[]>([]);

  const flushBuffer = async () => {
    if (swipeBufferRef.current.length === 0) return;
    const currBatch = [...swipeBufferRef.current];
    swipeBufferRef.current = []; // Clear immediately

    try {
      await fetch("/api/play/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currBatch),
      });
    } catch (e) {
      console.error("Failed to flush swipe buffer", e);
    }
  };

  const handleSwipe = async (direction: "left" | "right" | "up") => {
    const currentFood = foods[currentIndex];
    let status: RecordStatus = RecordStatus.DISLIKE;
    const userPlayId = checkCookie("userPlayId");
    if (direction === "right") status = RecordStatus.LIKE;
    if (direction === "up") status = RecordStatus.EAT;
    const data: any = {
      userPlayId: userPlayId,
      status: status,
      itemId: currentFood.id
    }
    // console.log("Swipe data:", data);

    // Add to buffer instead of sending immediately
    swipeBufferRef.current.push(data);

    // Flush if we reached batch size of 5
    if (swipeBufferRef.current.length >= 5) {
      await flushBuffer();
    }

    const newHistory = [
      ...history,
      { id: currentFood.id, name: currentFood.name, status },
    ];
    setHistory(newHistory);

    // LOGIC: Load more after 4 swipes (or when running low)
    // If we have fewer than 4 items remaining ahead, try to fetch more.
    // Remaining = Total - (CurrentIndex + 1 (the one just swiped))
    const remaining = foods.length - (currentIndex + 1);
    if (remaining <= 6 && !isLoading) {
      // Fetch next batch starting at current length
      fetchItems(foods.length);
    }

    if (direction === "up") {
      // Flush before finishing
      await flushBuffer();
      setIsFinished(true);
    } else {
      // If we are truly at end and no more items came in
      if (currentIndex >= foods.length - 1) {
        // Wait a bit to see if fetch finishes? 
        // Or just show finished if not loading.
        if (!isLoading) {
          await flushBuffer();
          setIsFinished(true);
        }
        // If loading, user might wait on a spinner or effectively existing blank card 
        // (though better UI would show loading indicator card).
        // incrementing index anyway allows loop to try rendering next
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  if (isFinished) {
    const finalChoice =
      history.find((h) => h.status === RecordStatus.EAT) || history[history.length - 1];

    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center max-w-lg">
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-2">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">สรุปผลการเลือก</h1>
          <p className="text-slate-500">มื้อนี้คุณเลือกกินอันนี้!</p>
        </div>

        <Card className="w-full overflow-hidden rounded-3xl border-none shadow-xl bg-white mb-8">
          <CardContent className="p-0">
            {finalChoice && (
              <div className="relative">
                <div className="aspect-4/3 bg-slate-100">
                  <img
                    src={foods.find((f) => f.id === finalChoice.id)?.image}
                    alt={finalChoice.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {finalChoice.name}
                  </h2>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-semibold px-3 py-1 bg-green-50 rounded-full text-sm border border-green-100">
                      ยืนยันเลือกรายการนี้
                    </span>
                    <span className="text-xl font-bold text-slate-900">
                      ฿{foods.find((f) => f.id === finalChoice.id)?.price}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 w-full">
          <Button
            variant="outline"
            className="h-12 rounded-xl gap-2 hover:bg-slate-50"
            onClick={() => {
              setCurrentIndex(0);
              setHistory([]);
              setIsFinished(false);
            }}
          >
            <RefreshCcw className="h-4 w-4" /> เลือกใหม่
          </Button>
          <Link href="/" className="w-full">
            <Button className="h-12 w-full rounded-xl gap-2 bg-green-600 hover:bg-green-700">
              <HomeIcon className="h-4 w-4" /> กลับหน้าหลัก
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center overflow-hidden min-h-[calc(100vh-64px)]">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">ปัดเลือกอาหาร</h1>
        <p className="text-slate-500 text-sm">
          รายการที่ {currentIndex + 1} จาก {foods.length}
        </p>
      </div>

      <div className="relative w-full max-w-sm aspect-3/4 mb-24">
        <AnimatePresence>
          {foods && foods
            .slice(currentIndex, currentIndex + 2)
            .reverse()
            .map((food, index) => {
              const isFront =
                index === 1 ||
                foods.slice(currentIndex, currentIndex + 2).length === 1;
              return (
                <FoodCard
                  key={food.id}
                  food={food}
                  onSwipe={handleSwipe}
                  isFront={isFront}
                />
              );
            })}
        </AnimatePresence>

        {/* Manual buttons for accessibility as per requirement */}
        <div className="absolute -bottom-20 left-0 right-0 flex justify-center gap-6 pointer-events-auto">
          <button
            onClick={() => handleSwipe("left")}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-red-500 shadow-lg transition-transform hover:scale-110 active:scale-95 border border-slate-100"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={() => handleSwipe("up")}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-500 shadow-lg transition-transform hover:scale-110 active:scale-95 border border-slate-100"
          >
            <UtensilsCrossed className="h-6 w-6" />
          </button>
          <button
            onClick={() => handleSwipe("right")}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-green-500 shadow-lg transition-transform hover:scale-110 active:scale-95 border border-slate-100"
          >
            <Heart className="h-8 w-8" />
          </button>
        </div>

        {!isLoading && currentIndex >= foods?.length && (
          <div className="absolute inset-0 flex items-center justify-center text-center p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="space-y-4">
              <p className="text-slate-400 font-medium">
                ไม่มีรายการอาหารเหลือแล้ว
              </p>
              <Button onClick={() => setIsFinished(true)}>ดูสรุปผล</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
