import ClientSwipe from "@/components/swipe/ClientSwipe";
import { itemService } from "@/lib/service";
import { Filter } from "@/types/type";

type ToValueString<T> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[K in keyof T]?: T[K] extends any[] ? string[] : string;
};

type SwipeSearchParams = Omit<
	ToValueString<Filter>,
	"seenItems" | "targetItems"
>;

const parseFilter = (params: SwipeSearchParams): Filter => {
	return {
		tagIds: params.tagIds ? params.tagIds.split(",").filter(Boolean) : [],
		locationIds: params.locationIds
			? params.locationIds.split(",").filter(Boolean)
			: [],
		priceMin: params.priceMin ? Number(params.priceMin) : undefined,
		priceMax: params.priceMax ? Number(params.priceMax) : undefined,
	};
};

export default async function SwipePage({
	searchParams,
}: {
	searchParams: Promise<SwipeSearchParams>;
}) {
	const params = await searchParams;
	const filter = parseFilter(params);
	const foods = await itemService.getItems(filter, 15);

	return <ClientSwipe initialFoods={foods} filter={filter} />;
}
