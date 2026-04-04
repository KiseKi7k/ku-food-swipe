import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Utensils, History } from "lucide-react";

export default function UserProfilePage() {
	// // TODO: Fetch user profile data and stats using params.id
	const mockStats = {
		totalPlays: 42,
		swipesRight: 800,
		swipesLeft: 1200,
		eatenCount: 42,
	};
	const topMenus = ["Krapow Moo Saap", "Khaoman Gai", "Som Tum", "Pad Thai", "Tom Yum Goong", "Boat Noodles", "Mango Sticky Rice", "Green Curry", "Crispy Pork Kale", "Omelette on Rice"];
	const topTags = ["Spicy", "Pork", "Thai", "Chicken", "Noodles"];
	
	const mockHistory = [
		{ id: 1, date: "2026-04-01", rightSwipes: 12, leftSwipes: 20, eaten: "Krapow Moo Saap" },
		{ id: 2, date: "2026-03-28", rightSwipes: 8, leftSwipes: 15, eaten: "Pad Thai" },
		{ id: 3, date: "2026-03-25", rightSwipes: 25, leftSwipes: 40, eaten: "Som Tum" },
	];

	return (
		<div className="min-h-screen bg-slate-50 pb-20">
			<Header />
			
			<main className="container max-w-3xl mx-auto px-4 pt-8">
				{/* Profile Header */}
				<div className="flex items-center gap-4 mb-8">
					<div className="h-20 w-20 rounded-full bg-green-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-green-200">
						U
					</div>
					<div>
						<h1 className="text-3xl font-bold text-slate-900">User Profile</h1>
						<p className="text-slate-500">Food Swipe Enthusiast</p>
					</div>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<Card className="border-none shadow-sm bg-white">
						<CardContent className="p-4 flex flex-col items-center justify-center text-center">
							<span className="text-sm font-semibold text-slate-500 mb-1">Total Plays</span>
							<span className="text-3xl font-black text-slate-800">{mockStats.totalPlays}</span>
						</CardContent>
					</Card>
					<Card className="border-none shadow-sm bg-white">
						<CardContent className="p-4 flex flex-col items-center justify-center text-center">
							<span className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1"><Check className="h-4 w-4 text-green-500"/> Likes</span>
							<span className="text-3xl font-black text-green-600">{mockStats.swipesRight}</span>
						</CardContent>
					</Card>
					<Card className="border-none shadow-sm bg-white">
						<CardContent className="p-4 flex flex-col items-center justify-center text-center">
							<span className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1"><X className="h-4 w-4 text-red-500"/> Dislikes</span>
							<span className="text-3xl font-black text-red-500">{mockStats.swipesLeft}</span>
						</CardContent>
					</Card>
					<Card className="border-none shadow-sm bg-white">
						<CardContent className="p-4 flex flex-col items-center justify-center text-center">
							<span className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1"><Utensils className="h-4 w-4 text-blue-500"/> Eaten</span>
							<span className="text-3xl font-black text-blue-600">{mockStats.eatenCount}</span>
						</CardContent>
					</Card>
				</div>

				<div className="grid md:grid-cols-2 gap-8 mb-8">
					{/* Top 10 Menus */}
					<div>
						<h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
							<Utensils className="h-5 w-5 text-green-600" />
							Top 10 Liked Menus
						</h2>
						<Card className="border-none shadow-sm">
							<CardContent className="p-0">
								{topMenus.map((menu, i) => (
									<div key={i} className="flex items-center gap-3 p-3 border-b border-slate-50 last:border-0 hover:bg-slate-50">
										<span className="font-bold w-6 text-slate-400">{i + 1}</span>
										<span className="font-medium text-slate-700">{menu}</span>
									</div>
								))}
							</CardContent>
						</Card>
					</div>

					{/* Top 5 Tags & History */}
					<div className="space-y-8">
						<div>
							<h2 className="text-xl font-bold text-slate-800 mb-4">Top 5 Favorite Tags</h2>
							<div className="flex flex-wrap gap-2">
								{topTags.map((tag, i) => (
									<Badge key={i} className="text-sm py-1 px-3 bg-green-100 text-green-800 hover:bg-green-200 border-none">
										#{i + 1} {tag}
									</Badge>
								))}
							</div>
						</div>

						<div>
							<h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
								<History className="h-5 w-5 text-green-600" />
								Recent History
							</h2>
							<div className="space-y-3">
								{mockHistory.map((item) => (
									<Card key={item.id} className="border-none shadow-sm bg-white overflow-hidden">
										<div className="flex border-b border-slate-100 divide-x divide-slate-100">
											<div className="flex-1 p-2 text-center text-xs font-semibold text-green-600 bg-green-50/50">
												{item.rightSwipes} Likes
											</div>
											<div className="flex-1 p-2 text-center text-xs font-semibold text-red-500 bg-red-50/50">
												{item.leftSwipes} Dislikes
											</div>
										</div>
										<CardContent className="p-4 flex items-center justify-between">
											<div>
												<p className="text-xs text-slate-400 font-medium mb-1">{item.date}</p>
												<p className="font-bold text-slate-800">{item.eaten}</p>
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
