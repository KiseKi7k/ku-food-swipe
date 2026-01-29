export type Food = {
  id: string;
  name: string;
  priceMin: number;
  priceMax: number;
  image: string;
  tags: string[];
  shop: string;
};

export type SwipeStatus = "like" | "dislike" | "eat";

export type SwipeHistory = {
  id: string;
  name: string;
  status: SwipeStatus;
};

export type Tag = {
  [x: string]: any;
  id: number;
  name: string;
};

export type Shop = {
  id: string;
  name: string;
  locationId: string;
};

export type FoodItem = {
  id: string;
  foodId: string;
  priceMin: number;
  priceMax: number | null;
  shopId: string;
  foods: Food;
  Shop: Shop;
};

export type RawFoodItem = {
  food: {
    image: string | null;
    tags: {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      name: string;
    }[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
  };
  shop: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    locationId: string;
  };
  id: string;
  foodId: string;
  priceMin: number;
  priceMax: number;
  shopId: string;
  createdAt: Date;
  updatedAt: Date;
};
