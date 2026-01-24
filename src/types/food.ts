export interface Food {
  id: string;
  name: string;
  price: number;
  image: string;
  tags: string[];
  shop: string;
}

export type SwipeStatus = "like" | "dislike" | "eat";

export interface SwipeHistory {
  id: string;
  name: string;
  status: SwipeStatus;
}
