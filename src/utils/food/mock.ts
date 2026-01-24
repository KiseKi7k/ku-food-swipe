import { Food } from "@/types/food";

const FOOD_NAMES = [
  "ข้าวมันไก่",
  "ข้าวผัดกระเพรา",
  "ส้มตำไทย",
  "ผัดไทย",
  "แกงเขียวหวาน",
  "ต้มยำกุ้ง",
  "ข้าวหมูแดง",
  "ข้าวขาหมู",
  "ราดหน้ายอดผัก",
  "ผัดซีอิ๊ว",
  "ก๋วยเตี๋ยวเรือ",
  "บะหมี่เกี๊ยว",
  "โจ๊กหมู",
  "ข้าวต้มปลา",
  "น้ำพริกปลาทู",
  "ไข่เจียวหมูสับ",
  "แกงส้มชะอมกุ้ง",
  "ตำซั่ว",
  "ลาบหมู",
  "ไก่ย่าง",
  "ข้าวเหนียวมะม่วง",
  "บัวลอย",
  "น้ำแข็งใส",
  "ชานมไข่มุก",
  "กาแฟโบราณ",
];

const SHOPS = [
  "ร้านลุงหนวด",
  "ครัวเจ๊เหมียว",
  "KU Food Court",
  "ร้านป้าข้างหอ",
  "The Greenery",
  "สวนอาหารเกษตร",
  "โรงอาหารกลาง",
  "ร้านอาหารใบหน้า",
  "ร้านน้องมุก",
  "ครัวนิสิต",
];

const TAG_OPTIONS = [
  "ข้าว",
  "ปลา",
  "หมู",
  "ไก่",
  "ผัก",
  "น้ำ",
  "ของหวาน",
  "ก๋วยเตี๋ยว",
  "เผ็ด",
  "เส้น",
];

const IMAGES = [
  "https://images.unsplash.com/photo-1512058560366-1a51042f96f2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
];

export const mockFoods: Food[] = Array.from({ length: 100 }, (_, i) => {
  const name = FOOD_NAMES[Math.floor(Math.random() * FOOD_NAMES.length)];
  const shop = SHOPS[Math.floor(Math.random() * SHOPS.length)];
  const tags = Array.from(
    { length: Math.floor(Math.random() * 3) + 1 },
    () => TAG_OPTIONS[Math.floor(Math.random() * TAG_OPTIONS.length)],
  );
  const uniqueTags = Array.from(new Set(tags));

  return {
    id: `food-${i + 1}`,
    name: `${name} (${i + 1})`,
    price: Math.floor(Math.random() * (200 - 40 + 1)) + 40,
    image: IMAGES[Math.floor(Math.random() * IMAGES.length)],
    tags: uniqueTags,
    shop: shop,
  };
});
