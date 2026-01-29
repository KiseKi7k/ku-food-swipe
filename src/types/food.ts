export type Food = {
  id: string;
  name: string;
  priceMin: number;
  priceMax: number;
  image: string;
  tags: string[];
  shop: string;
  location: string;
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
    name: string;
    tags: {
      name: string;
    }[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
  shop: {
    name: string;
    location: {
      name: string;
    };
  } | null;
  id: string;
  foodId: string;
  priceMin: number;
  priceMax: number | null;
  shopId: string | null;
  createdAt: Date;
  updatedAt: Date;
};
