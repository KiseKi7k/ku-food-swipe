export interface Food {
  id: string;
  name: string;
  price: number;
  image: string;
  tags: string[];
  shop: string;
}

import { RecordStatus } from "@/generated/enums";

export interface SwipeHistory {
  id: string;
  name: string;
  status: RecordStatus;
}
