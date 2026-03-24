import { getFilterData } from "@/actions/action";
import ClientHome from "@/components/home/ClientHome";

export default async function Home() {
	const filterData = await getFilterData();

	return <ClientHome filterData={filterData} />;
}
