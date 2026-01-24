"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Utensils } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg shadow-green-200">
            <Utensils className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            KU <span className="text-green-600">Food</span> Swipe
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Login
          </Button>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 shadow-md shadow-green-100"
          >
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}
