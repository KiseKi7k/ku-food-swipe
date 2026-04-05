"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Fuse from "fuse.js";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ImageUpload";
import { useSession } from "@/lib/authClient";
import { createPost } from "@/actions/action";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import SignInBtn from "@/components/SignInBtn";

export type CreateClientInput = {
	foods: { id: string; name: string; tags: string[] }[];
	locations: {
		id: string;
		name: string;
		shop: { id: string; name: string }[];
	}[];
	tags: { id: string; name: string }[];
};

export type CreateForm = {
	food?: { id: string; name: string };
	priceMin: number;
	priceMax?: number;
	tags: string[];
	shop?: { id: string; name: string };
	location?: { id: string; name: string };
	image: Buffer<ArrayBuffer> | null;
};

export default function CreateClient({
	createInput,
}: {
	createInput: CreateClientInput;
}) {
	const { data } = useSession();
	const [isPending, setIsPending] = useState(false);

	const [query, setQuery] = useState({
		food: "",
		shop: "",
	});

	const [form, setForm] = useState<CreateForm>({
		priceMin: 0,
		tags: [],
		image: null,
	});

	const fuseFoods = useMemo(() => {
		return new Fuse(createInput.foods, {
			keys: ["name"],
			threshold: 0.3,
		});
	}, [createInput]);

	const foodResults = useMemo(() => {
		if (!query.food.trim()) return [];
		return fuseFoods.search(query.food, { limit: 5 }).map((r) => r.item);
	}, [query.food, fuseFoods]);

	const fuseShops = useMemo(() => {
		if (!form.location) return;

		const shops = createInput.locations.find(
			(l) => l.id === form.location?.id,
		)!.shop;
		return new Fuse(shops, { keys: ["name"], threshold: 0.3 });
	}, [form.location, createInput]);

	const shopResults = useMemo(() => {
		if (!query.shop.trim() || !fuseShops) return [];
		return fuseShops.search(query.shop, { limit: 5 }).map((r) => r.item);
	}, [query.shop, fuseShops]);

	const onImageChanged = (buffer: Buffer<ArrayBuffer> | null) => {
		setForm((p) => ({ ...p, image: buffer }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isPending) return;

		if (!data?.user || !form.food) return;
		setIsPending(true);

		if (!form.shop) {
			toast.error("กรุณาเลือกร้านค้าใหม่");
			setIsPending(false);
			return;
		}

		const buffer = form.image?.toString("base64");
		const post = await createPost(data.user.id, {
			createFood: false,
			shopId: form.shop.id,
			foodId: form.food.id,
			priceMin: form.priceMin,
			priceMax: form.priceMax,
			image: buffer,
		});
		setIsPending(false);

		if ("message" in post) {
			toast.error("ทำรายการไม่สำเร็จ");
		} else {
			toast("ทำรายการสำเร็จ");
			setForm({ priceMin: 0, tags: [], image: null });
		}
	};
	return (
		<div className="min-h-screen bg-slate-50 pb-20">
			<main className="container max-w-lg mx-auto px-4 pt-6">
				<Link
					href="/feed"
					className="inline-flex items-center text-sm text-green-600 font-medium mb-6 hover:text-green-700"
				>
					<ArrowLeft className="h-4 w-4 mr-1" />
					ย้อนกลับ
				</Link>

				<div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative">
					<div className="p-6 bg-green-600 text-white">
						<h1 className="text-2xl font-bold">เพิ่มเมนู</h1>
						<p className="text-green-100 mt-1">เเนะนำเมนูให้ผู้อื่นโหวต</p>
					</div>

					<form
						id="create-form"
						onSubmit={handleSubmit}
						className="p-6 space-y-5"
					>
						{!data?.user && (
							<div className="flex flex-col gap-2 absolute z-2 inset-0 items-center justify-center bg-gray-200/90 font-semibold">
								<p>กรุณา Log in</p>
								<SignInBtn />
							</div>
						)}
						<div className="space-y-2 relative">
							<Label>ชื่อเมนู</Label>
							<Input
								id="food"
								name="food"
								required
								placeholder="e.g. ข้าวกะเพราหมูสับไข่ดาว"
								className="focus-visible:ring-green-600"
								onChange={(e) => {
									const selected = createInput.foods.find(
										(f) => f.name === e.target.value,
									);
									if (selected) {
										setForm((p) => ({
											...p,
											food: selected,
											tags: selected.tags,
										}));
									} else {
										setForm((p) => ({ ...p, food: undefined, tags: [] }));
									}

									setQuery((p) => ({ ...p, food: e.target.value }));
								}}
								value={query.food}
							/>

							{foodResults.length > 0 && foodResults[0].name !== query.food && (
								<ul className="absolute flex flex-col border rounded-2xl w-full p-2 bg-white z-1">
									{foodResults.map((r) => (
										<li
											className="cursor-pointer p-2 hover:bg-gray-200 rounded-md transition-all duration-200 ease-out"
											key={r.id}
											onClick={() => {
												setQuery((p) => ({ ...p, food: r.name }));
												setForm((p) => ({ ...p, food: r, tags: r.tags }));
											}}
										>
											{r.name}
										</li>
									))}
								</ul>
							)}

							{form.tags.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-2">
									{form.tags.map((tag) => (
										<Badge
											key={tag}
											variant="secondary"
											className="bg-green-100 text-green-800"
										>
											{tag}
										</Badge>
									))}
								</div>
							)}
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="priceMin">ราคาเริ่มต้น (฿)</Label>
								<Input
									id="priceMin"
									type="number"
									placeholder="20"
									className="focus-visible:ring-green-600"
									required
									value={form.priceMin}
									onChange={(e) =>
										setForm((p) => ({
											...p,
											priceMin: parseInt(e.target.value) ?? 0,
										}))
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="priceMax">ราคาสูงสุด (฿)</Label>
								<Input
									id="priceMax"
									type="number"
									placeholder="ไม่บังคับ"
									className="focus-visible:ring-green-600"
									value={form.priceMax}
									onChange={(e) =>
										setForm((p) => ({
											...p,
											priceMax: parseInt(e.target.value) ?? 0,
										}))
									}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label>สถานที่</Label>
							<Select
								value={form.location?.id}
								onValueChange={(v) => {
									const selected = createInput.locations.find(
										(l) => l.id === v,
									);
									if (selected) {
										setForm((p) => ({
											...p,
											location: { id: selected.id, name: selected.name },
											shop: undefined,
										}));
										setQuery((p) => ({ ...p, shop: "" }));
									}
								}}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="สถานที่" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{createInput.locations.map((l) => (
											<SelectItem value={l.id} key={l.id}>
												{l.name}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2 relative">
							<Label>ชื่อร้าน</Label>
							<Input
								id="shop"
								name="shop"
								required
								placeholder="ตย. ครัวป้าใหญ่"
								className="focus-visible:ring-green-600"
								onChange={(e) => {
									setQuery((p) => ({ ...p, shop: e.target.value }));
									setForm((p) => ({ ...p, shop: undefined }));
								}}
								value={query.shop}
							/>
							{shopResults.length > 0 && shopResults[0].name !== query.shop && (
								<ul className="absolute flex flex-col border rounded-2xl w-full p-2 bg-white z-1">
									{shopResults.map((r) => (
										<li
											className="cursor-pointer p-2 hover:bg-gray-200 rounded-md transition-all duration-200 ease-out"
											key={r.id}
											onClick={() => {
												setQuery((p) => ({ ...p, shop: r.name }));
												setForm((p) => ({ ...p, shop: r }));
											}}
										>
											{r.name}
										</li>
									))}
								</ul>
							)}
						</div>

						<ImageUpload image={form.image} onImageChanged={onImageChanged} />

						{/* <div className="space-y-2">
							<Label>Tags</Label>
							<div className="flex gap-2">
								<Input
									value={tagInput}
									onChange={(e) => setTagInput(e.target.value)}
									onKeyDown={(e) =>
										e.key === "Enter" && (e.preventDefault(), handleAddTag())
									}
									placeholder="Add tags (e.g. Thai, Spicy)"
									className="focus-visible:ring-green-600"
								/>
								<Button
									type="button"
									onClick={handleAddTag}
									className="bg-green-600 hover:bg-green-700"
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>
							<div className="flex flex-wrap gap-2 mt-2">
								{tags.map((tag) => (
									<Badge
										key={tag}
										variant="secondary"
										className="bg-green-100 text-green-800"
										onClick={() => setTags(tags.filter((t) => t !== tag))}
									>
										{tag} &times;
									</Badge>
								))}
							</div>
						</div> */}

						<Button
							type="submit"
							form="create-form"
							className="w-full bg-green-600 hover:bg-green-700 mt-6 shadow-md shadow-green-200 h-12 text-lg"
						>
							{isPending ? <Spinner /> : <p>บันทึก</p>}
						</Button>
					</form>
				</div>
			</main>
		</div>
	);
}
