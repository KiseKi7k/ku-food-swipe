export interface Tag {
  id: number;
  Name: string; 
}

export interface Food {
  id: string;
  image: string | null;
  foodName: string;
  tags: Tag[];
}

export interface Shop {
  id: string;
  Name: string;
  locationId: string;
}

export interface FoodItem {
  id: string;
  foodId: string;
  priceMin: number;
  priceMax: number | null;
  shopId: string;
  foods: Food;
  Shop: Shop;
}