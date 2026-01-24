"use client";

import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { Food } from "@/types/food";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store } from "lucide-react";

interface FoodCardProps {
  food: Food;
  onSwipe: (direction: "left" | "right" | "up") => void;
  isFront: boolean;
}

export function FoodCard({ food, onSwipe, isFront }: FoodCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const dislikeOpacity = useTransform(x, [-50, -150], [0, 1]);
  const eatOpacity = useTransform(y, [-50, -150], [0, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe("right");
    } else if (info.offset.x < -100) {
      onSwipe("left");
    } else if (info.offset.y < -100) {
      onSwipe("up");
    }
  };

  if (!isFront) {
    return (
      <Card className="absolute w-full max-w-sm aspect-3/4 overflow-hidden rounded-3xl border-none shadow-xl">
        <div className="relative h-full w-full bg-slate-100 animate-pulse" />
      </Card>
    );
  }

  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      drag={isFront}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute w-full max-w-sm aspect-3/4 cursor-grab active:cursor-grabbing"
    >
      <Card className="h-full w-full overflow-hidden rounded-3xl border-none shadow-2xl bg-white relative">
        {/* Indicators */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-10 left-10 z-20 border-4 border-green-500 rounded-lg px-4 py-2 rotate-[-20deg]"
        >
          <span className="text-4xl font-black text-green-500 uppercase">
            ชอบ
          </span>
        </motion.div>
        <motion.div
          style={{ opacity: dislikeOpacity }}
          className="absolute top-10 right-10 z-20 border-4 border-red-500 rounded-lg px-4 py-2 rotate-20"
        >
          <span className="text-4xl font-black text-red-500 uppercase">
            ไม่ชอบ
          </span>
        </motion.div>
        <motion.div
          style={{ opacity: eatOpacity }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 border-4 border-blue-500 rounded-lg px-4 py-2"
        >
          <span className="text-4xl font-black text-blue-500 uppercase tracking-widest text-center block">
            อันนี้เเหละ!
          </span>
        </motion.div>

        {/* Image */}
        <div className="relative h-2/3 w-full rounded-t-3xl">
          <img
            src={food.image}
            alt={food.name}
            className="h-full w-full object-cover pointer-events-none rounded-t-3xl"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <CardContent className="absolute bottom-0 w-full p-6 text-white bg-linear-to-t from-green-600/80 via-green-600/50 to-transparent pt-12">
          <div className="space-y-2">
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-bold">{food.name}</h2>
              <span className="text-2xl font-bold text-green-400">
                ฿{food.price}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-200 text-sm">
              <Store className="h-4 w-4" />
              <span>{food.shop}</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {food.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
