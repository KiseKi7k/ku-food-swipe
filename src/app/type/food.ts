export interface Tag {
  id: number;
  name: string; 
}

export interface Food {
  id: string;
  image: string | null;
  foodName: string;
  tags: Tag[];
}

export interface Shop {
  id: string;
  name: string;
  locationId: string;
}

export interface FoodItem {
  id: string;
  foodId: string;
  priceMin: number;
  priceMax: number | null;
  shopId: string;
  food: Food;
  shop: Shop;
}