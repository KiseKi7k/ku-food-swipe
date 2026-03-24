import { X, UtensilsCrossed, Heart } from "lucide-react";

export const SwipeButtons = ({
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
