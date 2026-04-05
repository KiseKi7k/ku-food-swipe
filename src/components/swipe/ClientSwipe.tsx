"use client";

import { RecordStatus } from "@/generated/enums";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import FinalFoodCard from "./FinalFoodCard";
import { FoodCard } from "./FoodCard";
import { SwipeButtons } from "./SwipeButtons";
import { Filter, Food, PlayHistory } from "@/types/type";
import { redirect } from "next/navigation";
import { useSession } from "@/lib/authClient";
import { createPlayRecord } from "@/actions/action";

type ClientSwipeProps = { initialFoods: Food[]; filter: Filter };

const ClientSwipe = ({ initialFoods, filter }: ClientSwipeProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [history, setHistory] = useState<PlayHistory[]>([]);
	const [gameEnded, setGameEnded] = useState(false);

	const [foods, setFoods] = useState<Food[]>(initialFoods);
	const [isFetching, setIsFetching] = useState(false);

	const { data } = useSession();

	const handleSwipe = async (direction: "left" | "right" | "up") => {
		const currentFood = foods[currentIndex];
		let status: RecordStatus = "DISLIKE";
		if (direction === "right") status = "LIKE";
		if (direction === "up") status = "EAT";

		const newHistory = [...history, { itemId: currentFood.id, status }];
		setHistory(newHistory);

		const playEnd = direction === "up" || currentIndex >= foods.length - 1;

		if (playEnd) {
			setGameEnded(true);
		} else {
			setCurrentIndex((prev) => prev + 1);

			const foodBuffer = 5;
			if (currentIndex >= foods.length - foodBuffer && !isFetching) {
				fetchRecommendItems();
			}
		}
	};

	const fetchRecommendItems = async () => {
		setIsFetching(true);
		try {
			const res = await fetch(`/api/items/recommend`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					filter,
					history,
				}),
			});

			if (res.ok) {
				const data = await res.json();
				const foods = data.data as Food[];
				setFoods((p) => [...p, ...foods]);
			}
		} catch (err) {
			//TODO: Handle Error
			console.error(err);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		if (gameEnded && data) {
			createPlayRecord({ userId: data.user.id, history });
		}
	}, [data, gameEnded, history]);

	if (gameEnded) {
		const finalFood = foods[currentIndex];
		if (!finalFood) redirect("/");

		return <FinalFoodCard food={finalFood} />;
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
					{foods &&
						foods
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
				{currentIndex >= foods?.length && (
					<div className="absolute inset-0 flex items-center justify-center text-center p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
						<div className="space-y-4">
							<p className="text-slate-400 font-medium">
								ไม่มีรายการอาหารเหลือแล้ว
							</p>
							<Button onClick={() => setGameEnded(true)}>ดูสรุปผล</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ClientSwipe;
