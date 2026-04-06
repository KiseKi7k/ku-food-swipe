import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Utensils, History } from "lucide-react";
import { userService } from "@/service/user.service";
import Image from "next/image";
import { unstable_cache } from "next/cache";

const mockUserData = {
	createdAt: "2026-04-05T04:44:07.582Z",
	updatedAt: "2026-04-05T04:44:07.582Z",
	userPlays: [
		{
			createdAt: "2026-04-06T14:06:28.483Z",
			food: "ข้าวคลุกกะปิ",
			likeCount: 24,
			dislikeCount: 36,
		},
		{
			createdAt: "2026-04-05T08:20:31.650Z",
			food: "สปาเกตตี้คาโบนาร่า",
			likeCount: 12,
			dislikeCount: 10,
		},
	],
	likeCount: 96,
	dislikeCount: 48,
	playCount: 16,
	favoriteTags: [
		{ name: "ไทย", count: 15 },
		{ name: "เส้น", count: 10 },
		{ name: "ไม่เผ็ด", count: 7 },
		{ name: "อาหารจานเดียว", count: 6 },
		{ name: "ซุป", count: 5 },
		{ name: "เครื่องดื่ม", count: 4 },
		{ name: "หวาน", count: 4 },
		{ name: "ของหวาน", count: 3 },
		{ name: "เผ็ด", count: 3 },
		{ name: "สุขภาพ", count: 2 },
	],
	favoriteFoods: [
		{ name: "ก๋วยเตี๋ยวหมูน้ำตก", count: 3 },
		{ name: "เต้าฮวย", count: 2 },
		{ name: "ข้าวไข่ข้น", count: 2 },
		{ name: "ข้าวคลุกกะปิ", count: 2 },
		{ name: "ข้าวผัดทะเล", count: 2 },
		{ name: "บะหมี่เกี๊ยวหมู", count: 2 },
		{ name: "สับปะรดปั่น", count: 1 },
		{ name: "เย็นตาโฟ", count: 1 },
		{ name: "เอสเปรสโซ่", count: 1 },
		{ name: "แตงโมปั่น", count: 1 },
	],
};

export default async function UserProfilePage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = await params;
	const getUser = unstable_cache(
		async () => await userService.getUserInfo(id),
		["user", id],
		{ revalidate: 1000 * 60 * 30 },
	);
	const userDB = await getUser();
	const user = {
		...userDB,
		...mockUserData,
	};

	return (
		<div className="min-h-screen bg-slate-50 pb-20">
			<main className="container max-w-3xl mx-auto px-4 pt-8">
				{/* Profile Header */}
				<div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
					<div className="relative">
						<Image
							src={user?.image || "/avatar.png"}
							alt={user?.name || "User"}
							width={64}
							height={64}
							className="rounded-full"
						/>
					</div>
					<div className="text-center sm:text-left">
						<h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
						<p className="text-slate-500">{user.id}</p>
					</div>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<Card className="border-none shadow-sm bg-white">
						<CardContent className="p-4 flex flex-col items-center justify-center text-center">
							<span className="text-sm font-semibold text-slate-500 mb-1">
								เล่นไปทั้งหมด
							</span>
							<span className="text-3xl font-black text-slate-800">
								{user.playCount}
							</span>
						</CardContent>
					</Card>
					<Card className="border-none shadow-sm bg-white">
						<CardContent className="p-4 flex flex-col items-center justify-center text-center">
							<span className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1">
								<Check className="h-4 w-4 text-green-500" /> ชอบ
							</span>
							<span className="text-3xl font-black text-green-600">
								{user.likeCount}
							</span>
						</CardContent>
					</Card>
					<Card className="border-none shadow-sm bg-white">
						<CardContent className="p-4 flex flex-col items-center justify-center text-center">
							<span className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1">
								<X className="h-4 w-4 text-red-500" /> ไม่ชอบ
							</span>
							<span className="text-3xl font-black text-red-500">
								{user.dislikeCount}
							</span>
						</CardContent>
					</Card>
					<Card className="border-none shadow-sm bg-white">
						<CardContent className="p-4 flex flex-col items-center justify-center text-center">
							<span className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1">
								<Utensils className="h-4 w-4 text-blue-500" /> กิน!!!
							</span>
							<span className="text-3xl font-black text-blue-600">
								{user.playCount}
							</span>
						</CardContent>
					</Card>
				</div>

				<div className="grid md:grid-cols-2 gap-8 mb-8">
					{/* Top 10 Menus */}
					<div>
						<h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
							<Utensils className="h-5 w-5 text-green-600" />
							เมนูโปรด 10 อันดับ
						</h2>
						<Card className="border-none shadow-sm">
							<CardContent className="p-0">
								{user.favoriteFoods.map((food, i) => (
									<div
										key={i}
										className="flex items-center gap-3 p-3 border-b border-slate-50 last:border-0 hover:bg-slate-50"
									>
										<span className="font-bold w-6 text-slate-400">
											{i + 1}
										</span>
										<span className="font-medium text-slate-700">
											{food.name}
										</span>
									</div>
								))}
							</CardContent>
						</Card>
					</div>

					{/* Top 5 Tags & History */}
					<div className="space-y-8">
						<div>
							<h2 className="text-xl font-bold text-slate-800 mb-4">
								แท็กโปรด 10 อันดับ
							</h2>
							<div className="flex flex-wrap gap-2">
								{user.favoriteTags.map((tag, i) => (
									<Badge
										key={i}
										className="text-sm py-1 px-3 bg-green-100 text-green-800 hover:bg-green-200 border-none"
									>
										#{i + 1} {tag.name}
									</Badge>
								))}
							</div>
						</div>

						<div>
							<h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
								<History className="h-5 w-5 text-green-600" />
								การเล่นล่าสุด
							</h2>
							<div className="space-y-3">
								{user.userPlays &&
									user.userPlays.map((item) => (
										<Card
											key={item.id}
											className="border-none py-0 shadow-sm bg-white overflow-hidden"
										>
											<div className="flex border-b border-slate-100 divide-x divide-slate-100">
												<div className="flex-1 p-2 py-4 text-center text-xs font-semibold text-green-600 bg-green-50/50">
													{item.likeCount} ชอบ
												</div>
												<div className="flex-1 p-2 py-4 text-center text-xs font-semibold text-red-500 bg-red-50/50">
													{item.dislikeCount} ไม่ชอบ
												</div>
											</div>
											<CardContent className="p-4 flex items-center justify-between">
												<div>
													<p className="text-xs text-slate-400 font-medium mb-1">
														{item.createdAt.toLocaleString("en-GB")}
													</p>
													<p className="font-bold text-slate-800">
														{item.food}
													</p>
												</div>
												<div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
													<Utensils className="h-5 w-5" />
												</div>
											</CardContent>
										</Card>
									))}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
