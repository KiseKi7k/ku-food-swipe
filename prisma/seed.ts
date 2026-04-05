import prisma from "../src/lib/prisma";

const mockFoods = [
	{ name: "ข้าวกะเพราหมูสับไข่ดาว", tags: ["อาหารจานเดียว", "เผ็ด", "ไทย"] },
	{ name: "ข้าวกะเพราไก่ไข่ดาว", tags: ["อาหารจานเดียว", "เผ็ด", "ไทย"] },
	{ name: "ข้าวกะเพราทะเล", tags: ["อาหารจานเดียว", "เผ็ด", "ไทย"] },
	{ name: "ข้าวผัดหมู", tags: ["อาหารจานเดียว", "ไม่เผ็ด", "ไทย"] },
	{ name: "ข้าวผัดไก่", tags: ["อาหารจานเดียว", "ไม่เผ็ด", "ไทย"] },
	{ name: "ข้าวผัดทะเล", tags: ["อาหารจานเดียว", "ไม่เผ็ด", "ไทย"] },
	{ name: "ข้าวมันไก่", tags: ["อาหารจานเดียว", "ไม่เผ็ด", "ไทย"] },
	{ name: "ข้าวมันไก่ทอด", tags: ["อาหารจานเดียว", "ไม่เผ็ด", "ไทย"] },
	{ name: "ข้าวหมูแดง", tags: ["อาหารจานเดียว", "ไม่เผ็ด", "ไทย"] },
	{ name: "ข้าวหมูกรอบ", tags: ["อาหารจานเดียว", "กรอบ", "ไทย"] },
	{ name: "ข้าวขาหมู", tags: ["อาหารจานเดียว", "ไม่เผ็ด", "ไทย"] },
	{ name: "ข้าวหมูทอดกระเทียม", tags: ["อาหารจานเดียว", "ไม่เผ็ด", "ไทย"] },
	{ name: "ข้าวไก่ทอด", tags: ["อาหารจานเดียว", "กรอบ", "ไทย"] },
	{ name: "ข้าวไข่เจียว", tags: ["อาหารจานเดียว", "ไม่เผ็ด", "ไทย"] },
	{ name: "ข้าวไข่ข้น", tags: ["อาหารจานเดียว", "ไม่เผ็ด", "ไทย"] },
	{ name: "ข้าวคลุกกะปิ", tags: ["อาหารจานเดียว", "ไทย"] },
	{ name: "ข้าวหมูผัดพริกแกง", tags: ["อาหารจานเดียว", "เผ็ด", "ไทย"] },
	{ name: "ข้าวไก่ผัดเม็ดมะม่วง", tags: ["อาหารจานเดียว", "ไม่เผ็ด", "ไทย"] },
	{ name: "ข้าวผัดกะเพราคลุก", tags: ["อาหารจานเดียว", "เผ็ด", "ไทย"] },
	{ name: "ข้าวราดแกง", tags: ["อาหารจานเดียว", "ไทย"] },

	{ name: "ผัดซีอิ๊วหมู", tags: ["เส้น", "ไม่เผ็ด", "ไทย"] },
	{ name: "ผัดซีอิ๊วไก่", tags: ["เส้น", "ไม่เผ็ด", "ไทย"] },
	{ name: "ผัดไทย", tags: ["เส้น", "ไทย"] },
	{ name: "ผัดไทยกุ้งสด", tags: ["เส้น", "ไทย"] },
	{ name: "ราดหน้าหมู", tags: ["เส้น", "ซุป", "ไทย"] },
	{ name: "ราดหน้าทะเล", tags: ["เส้น", "ซุป", "ไทย"] },
	{ name: "สุกี้น้ำ", tags: ["เส้น", "ซุป", "ไทย"] },
	{ name: "สุกี้แห้ง", tags: ["เส้น", "ไทย"] },
	{ name: "บะหมี่หมูแดง", tags: ["เส้น", "ไม่เผ็ด", "ไทย"] },
	{ name: "บะหมี่เกี๊ยวหมู", tags: ["เส้น", "ไม่เผ็ด", "ไทย"] },
	{ name: "ก๋วยเตี๋ยวหมูน้ำตก", tags: ["เส้น", "เผ็ด", "ซุป", "ไทย"] },
	{ name: "ก๋วยเตี๋ยวเรือ", tags: ["เส้น", "เผ็ด", "ไทย"] },
	{ name: "ก๋วยเตี๋ยวต้มยำ", tags: ["เส้น", "เผ็ด", "ไทย"] },
	{ name: "เย็นตาโฟ", tags: ["เส้น", "ซุป", "ไทย"] },
	{ name: "มาม่าผัดขี้เมา", tags: ["เส้น", "เผ็ด", "ไทย"] },
	{ name: "สปาเกตตี้ซอสแดง", tags: ["เส้น", "ตะวันตก"] },
	{ name: "สปาเกตตี้คาโบนาร่า", tags: ["เส้น", "ตะวันตก"] },
	{ name: "ราเมงหมูชาชู", tags: ["เส้น", "ซุป", "ญี่ปุ่น"] },
	{ name: "อุด้ง", tags: ["เส้น", "ซุป", "ญี่ปุ่น"] },
	{ name: "โซบะ", tags: ["เส้น", "ญี่ปุ่น"] },

	{ name: "ส้มตำไทย", tags: ["อีสาน", "เผ็ด"] },
	{ name: "ส้มตำปูปลาร้า", tags: ["อีสาน", "เผ็ด"] },
	{ name: "ไก่ย่าง", tags: ["ปิ้งย่าง", "อีสาน"] },
	{ name: "คอหมูย่าง", tags: ["ปิ้งย่าง", "อีสาน"] },
	{ name: "ลาบหมู", tags: ["อีสาน", "เผ็ด"] },
	{ name: "น้ำตกหมู", tags: ["อีสาน", "เผ็ด"] },
	{ name: "ตับหวาน", tags: ["อีสาน"] },
	{ name: "ข้าวเหนียวหมูปิ้ง", tags: ["ปิ้งย่าง", "ไม่เผ็ด", "ไทย"] },
	{ name: "หมูปิ้ง", tags: ["ปิ้งย่าง", "ไม่เผ็ด", "ไทย"] },
	{ name: "ไส้กรอกอีสาน", tags: ["ปิ้งย่าง", "อีสาน"] },

	{ name: "หมาล่าเสียบไม้", tags: ["ปิ้งย่าง", "เผ็ด", "จีน"] },
	{ name: "ไก่ทอดเกาหลี", tags: ["ทอด", "เกาหลี", "เผ็ด"] },
	{ name: "ต๊อกบกกี", tags: ["เกาหลี", "เผ็ด"] },
	{ name: "ข้าวยำเกาหลี", tags: ["เกาหลี"] },
	{ name: "ซูชิ", tags: ["ญี่ปุ่น", "ไม่เผ็ด"] },
	{ name: "ซาชิมิ", tags: ["ญี่ปุ่น"] },
	{ name: "ข้าวหน้าเนื้อ", tags: ["ญี่ปุ่น"] },
	{ name: "แกงกะหรี่ญี่ปุ่น", tags: ["ญี่ปุ่น", "ไม่เผ็ด"] },
	{ name: "ไก่คาราอาเกะ", tags: ["ทอด", "ญี่ปุ่น"] },
	{ name: "เทมปุระ", tags: ["ทอด", "ญี่ปุ่น"] },

	{ name: "สลัดอกไก่", tags: ["สุขภาพ", "คลีน", "ไม่เผ็ด"] },
	{ name: "สลัดทูน่า", tags: ["สุขภาพ", "คลีน"] },
	{ name: "สลัดผักรวม", tags: ["สุขภาพ", "คลีน"] },
	{ name: "อกไก่นึ่ง", tags: ["สุขภาพ", "คลีน"] },
	{ name: "ไข่ต้ม", tags: ["สุขภาพ", "คลีน"] },

	{ name: "ชานมไข่มุก", tags: ["เครื่องดื่ม", "หวาน"] },
	{ name: "ชาเขียวมัทฉะ", tags: ["เครื่องดื่ม", "หวาน", "ญี่ปุ่น"] },
	{ name: "ชาไทยเย็น", tags: ["เครื่องดื่ม", "หวาน", "ไทย"] },
	{ name: "กาแฟเย็น", tags: ["เครื่องดื่ม", "ขม"] },
	{ name: "เอสเปรสโซ่", tags: ["เครื่องดื่ม", "ขม"] },
	{ name: "คาปูชิโน่", tags: ["เครื่องดื่ม"] },
	{ name: "ลาเต้", tags: ["เครื่องดื่ม"] },
	{ name: "โกโก้เย็น", tags: ["เครื่องดื่ม", "หวาน"] },
	{ name: "นมชมพู", tags: ["เครื่องดื่ม", "หวาน"] },
	{ name: "น้ำผลไม้ปั่น", tags: ["เครื่องดื่ม", "สุขภาพ", "หวาน"] },

	{ name: "แตงโมปั่น", tags: ["เครื่องดื่ม", "หวาน", "สุขภาพ"] },
	{ name: "มะม่วงปั่น", tags: ["เครื่องดื่ม", "หวาน", "สุขภาพ"] },
	{ name: "สับปะรดปั่น", tags: ["เครื่องดื่ม", "หวาน", "สุขภาพ"] },
	{ name: "กล้วยปั่น", tags: ["เครื่องดื่ม", "หวาน", "สุขภาพ"] },
	{ name: "น้ำส้มคั้น", tags: ["เครื่องดื่ม", "สุขภาพ"] },

	{ name: "ขนมปังปิ้งเนยนม", tags: ["ของหวาน", "หวาน"] },
	{ name: "ขนมปังปิ้งช็อกโกแลต", tags: ["ของหวาน", "หวาน"] },
	{ name: "โรตีนม", tags: ["ของหวาน", "หวาน"] },
	{ name: "โรตีช็อกโกแลต", tags: ["ของหวาน", "หวาน"] },
	{ name: "แพนเค้ก", tags: ["ของหวาน", "หวาน"] },
	{ name: "วาฟเฟิล", tags: ["ของหวาน", "หวาน"] },
	{ name: "ไอศกรีม", tags: ["ของหวาน", "หวาน"] },
	{ name: "บิงซู", tags: ["ของหวาน", "เกาหลี", "หวาน"] },
	{ name: "เต้าฮวย", tags: ["ของหวาน"] },
	{ name: "เฉาก๊วย", tags: ["ของหวาน"] },
];

const mockShop = {
	บาร์ใหม่: [
		"กะเพราพ่นไฟบาร์ใหม่",
		"ชาบูเสียบไม้",
		"ไก่ทอดซอสเกาหลี",
		"หมาล่าเด็กเกษตร",
		"ข้าวหน้าเนื้อพรีเมียม",
		"สลัดคลีนสายฟิต",
		"ชานมไข่มุกล้นแก้ว",
		"ข้าวยำเกาหลี",
		"ราเมงเส้นสด",
		"ของหวานคาเฟ่บาร์ใหม่",
	],
	บาร์วิศวะ: [
		"กะเพราถาดวิศวะ",
		"ข้าวมันไก่ช่างกล",
		"เตี๋ยวเรือหน้าเฟือง",
		"ข้าวหมูทอดโรงกลึง",
		"ผัดซีอิ๊วสายลุย",
		"ข้าวไข่เจียวโอเวอร์โหลด",
		"ตามสั่ง 24 ชม. (เกือบ)",
		"หมูปิ้งหน้าแลป",
		"สุกี้วิศวะหม้อใหญ่",
		"ข้าวผัดพลังงานสูง",
	],
	บาร์วิทยศาสตร์: [
		"กะเพราทดลองสูตร",
		"ข้าวหมูแดง DNA",
		"เตี๋ยวต้มยำสูตรเคมี",
		"ข้าวไข่ข้นฟิสิกส์",
		"ผัดไทยสมดุล",
		"ส้มตำแล็บวิทย์",
		"ไก่ย่างอินทรีย์",
		"ข้าวแกงสุ่มตัวอย่าง",
		"นมสดพาสเจอร์ไรส์",
		"น้ำผลไม้สกัดเย็น",
	],
};

const getRandomPriceMin = () => {
	const values = [];
	for (let i = 20; i <= 80; i += 5) {
		values.push(i);
	}
	return values[Math.floor(Math.random() * values.length)];
};

const maybePriceMax = (priceMin: number): number | null => {
	const shouldHave = Math.random() < 0.75;

	if (!shouldHave) return null;

	return priceMin + 20;
};

const getImage = async (query: string) => {
	try {
		const url = `https://serpapi.com/search.json?engine=google_images&q=${query}&location=Thailand&google_domain=google.co.th&hl=th&gl=th&api_key=${process.env.SERP_API_KEY}`;
		const res = await fetch(url);
		const data = await res.json();

		if (!data.images_results?.length) return null;

		const imageUrl = data.images_results[0].original;
		if (!imageUrl) return null;

		const resImage = await fetch(imageUrl);
		const arrayBuffer = await resImage.arrayBuffer();

		const buffer = Buffer.from(arrayBuffer);
		return buffer;
	} catch (e) {
		console.log(e);
		return null;
	}
};

const seedTag = async () => {
	const allTags = [...new Set(mockFoods.flatMap((f) => f.tags))];
	await prisma.tag.createMany({
		data: allTags.map((name) => ({ name })),
		skipDuplicates: true,
	});
};

const seedFoods = async () => {
	const foodsWithImages = await Promise.all(
		mockFoods.map(async (food) => ({
			...food,
			image: await getImage(food.name),
		})),
	);

	const tags = await prisma.tag.findMany({
		select: {
			id: true,
			name: true,
		},
	});
	const tagMap = Object.fromEntries(tags.map((tag) => [tag.name, tag.id]));

	for (const food of foodsWithImages) {
		await prisma.food.create({
			data: {
				name: food.name,
				tags: {
					connect: food.tags.map((tagName) => ({
						id: tagMap[tagName],
					})),
				},
				image: food.image,
			},
		});
	}
};

const seedLocationsAndShops = async () => {
	await prisma.$transaction(async (tx) => {
		for (const [location, shop] of Object.entries(mockShop)) {
			const { id: locationId } = await tx.location.create({
				data: { name: location },
				select: { id: true },
			});

			const shopData = shop.map((s) => ({ name: s, locationId }));
			await tx.shop.createMany({
				data: shopData,
			});
		}
	});
};

const seedItems = async () => {
	await prisma.$transaction(async (tx) => {
		const foods = await tx.food.findMany({ select: { id: true } });
		const shops = await tx.shop.findMany({ select: { id: true } });

		const foodIds = foods.map((f) => f.id);
		const shopIds = shops.map((s) => s.id);

		const selected = new Set<string>();
		const result: {
			foodId: string;
			shopId: string;
			priceMin: number;
			priceMax?: number;
		}[] = [];

		while (result.length < 120) {
			const foodId = foodIds[Math.floor(Math.random() * foodIds.length)];
			const shopId = shopIds[Math.floor(Math.random() * shopIds.length)];

			const key = `${foodId}-${shopId}`;

			if (!selected.has(key)) {
				selected.add(key);
				const priceMin = getRandomPriceMin();
				const priceMax = maybePriceMax(priceMin);
				result.push({
					foodId,
					shopId,
					priceMin,
					...(priceMax !== null && { priceMax }),
				});
			}

			if (result.length % 50 === 0) {
				console.log("Items: ", result.length);
			}
		}

		await tx.item.createMany({
			data: result,
		});
	});
};

const main = async () => {
	console.log("Seeding tags...");
	await seedTag();
	console.log("Seeding locations and shops...");
	await seedLocationsAndShops();
	console.log("Seeding foods...");
	await seedFoods();
	console.log("Seeding items...");
	await seedItems();
};

main();
