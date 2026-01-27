"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Filter } from "@/components/home/Filter";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Home() {
  // TODO: Check if user play session exist if then go to /swipe

  const [filters, setFilters] = useState({
    tags: [] as string[],
    shops: [] as string[],
    priceRange: [0, 500] as [number, number],
  });

  const handleStart = () => {
    // TODO: Create play session
    // TODO: Redirect to /swipe
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-100 mb-2">
          <Sparkles className="h-4 w-4" />
          <span>หิวหรือยัง? มาปัดหาของกินกัน!</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          เลือกเมนูที่ใช่ <br />
          ในสไตล์ <span className="text-green-600">Tinder</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          ปัดขวาถ้าชอบ ปัดซ้ายถ้าไม่หิว ปัดบนถ้าอยากกินร้านนี้เลย!{" "}
          <br className="hidden md:block" />
          ให้การเลือกอาหารมื้อนี้เป็นเรื่องง่ายและสนุก
        </p>
        <div className="pt-4 drop-shadow-2xl shadow-green-200">
          <Link href="/swipe">
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-green-600 hover:bg-green-700 gap-2 rounded-2xl shadow-xl shadow-green-100 transition-all hover:scale-105 active:scale-95"
              onClick={handleStart}
            >
              เริ่มปัดเลย <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-full max-w-xl bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100/50">
        <Filter onFilterChange={setFilters} />
      </section>
    </div>
  );
}
