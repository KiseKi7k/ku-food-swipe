"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { mockFoods } from "@/utils/food/mock";
import { FoodCard } from "@/components/swipe/FoodCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  RefreshCcw,
  Home as HomeIcon,
  CheckCircle2,
  Heart,
  UtensilsCrossed,
  X,
} from "lucide-react";
import Link from "next/link";
import { SwipeStatus } from "@/types/food";

type History = {
  id: string;
  status: SwipeStatus;
};

export default function SwipePage() {
  const [foods, setFoods] = useState(mockFoods);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<History[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSwipe = (direction: "left" | "right" | "up") => {
    const currentFood = foods[currentIndex];
    let status: SwipeStatus = "dislike";

    if (direction === "right") status = "like";
    if (direction === "up") status = "eat";

    const newHistory = [...history, { id: currentFood.id, status }];
    setHistory(newHistory);

    if (direction === "up" || currentIndex >= foods.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (isFinished) {
    const finalChoice = foods[currentIndex];

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
          {foods
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
        <SwipeButtons handleSwipe={handleSwipe} />

        {/* No foods left*/}
        {currentIndex >= foods.length && (
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

const SwipeButtons = ({
  handleSwipe,
}: {
  handleSwipe: (direction: "left" | "right" | "up") => void;
}) => {
  return (
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
  );
};
