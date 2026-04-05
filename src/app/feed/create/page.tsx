import prisma from "@/lib/prisma";
import CreateClient, { CreateClientInput } from "./CreateClient";
import { unstable_cache } from "next/cache";

const getCreateClientInput = unstable_cache(
	async (): Promise<CreateClientInput> => {
		const foods = await prisma.food.findMany({
			select: {
				id: true,
				name: true,
				tags: { select: { id: true, name: true } },
			},
		});
		const locations = await prisma.location.findMany({
			select: {
				id: true,
				name: true,
				shop: { select: { id: true, name: true } },
			},
		});

		const tags = foods.flatMap((f) => f.tags);

		return {
			foods: foods.map((f) => ({ ...f, tags: f.tags.flatMap((t) => t.name) })),
			locations,
			tags,
		};
	},
	["create-input-data"],
	{ revalidate: 60 * 60 },
);

const FeedCreatePage = async () => {
	const createClientInput = await getCreateClientInput();
	return <CreateClient createInput={createClientInput} />;
};

export default FeedCreatePage;
