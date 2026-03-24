"use client";

import { Building2, CheckCircle2, HomeIcon, Store } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Food, PlayData } from "@/types/type";
import Image from "next/image";
import { redirect } from "next/navigation";

import { useSession } from "@/lib/authClient";
import { itemService } from "@/lib/service";

type FinalFoodCardProps = {
	food: Food;
	history: PlayData["history"];
};

const FinalFoodCard = ({ food, history }: FinalFoodCardProps) => {
	const { data } = useSession();

	const handleEnd = async () => {
		if (data?.session) {
			// TODO: create record
			// itemService.createPlayRecord({ userId: data.user.id, history });
		}

		redirect("/");
	};

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
					<div>
						<div className="relative aspect-4/3 bg-slate-100">
							<Image
								src={food.image || ""}
								alt={food.name}
								fill
								className="object-cover"
							/>
						</div>
						<div className="p-6">
							<h2 className="text-2xl font-bold text-slate-800 mb-2">
								{food.name}
							</h2>
							<div className="flex items-center justify-between">
								<span className="flex flex-row items-end gap-2 text-green-600 font-semibold px-3 py-1 bg-green-50 rounded-full text-sm border border-green-100">
									<Store />
									{food.shop} <Building2 /> {food.location}
								</span>
								<span className="text-xl font-bold text-slate-900">
									฿{food.priceMin}
								</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="flex items-center w-2/3">
				{/* <Button
            variant="outline"
            className="h-12 rounded-xl gap-2 hover:bg-slate-50"
            onClick={() => {
              setCurrentIndex(0);
              setHistory([]);
              setIsFinished(false);
            }}
          >
            <RefreshCcw className="h-4 w-4" /> เลือกใหม่
          </Button> */}
				<div className="w-full flex">
					<Button
						onClick={handleEnd}
						className="h-12 w-full rounded-xl gap-2 bg-green-600 hover:bg-green-700"
					>
						<HomeIcon className="h-4 w-4" /> กลับหน้าหลัก
					</Button>
				</div>
			</div>
		</div>
	);
};

export default FinalFoodCard;
