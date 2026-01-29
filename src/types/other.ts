import { RecordStatus } from "@/generated/enums";

export type Tag = {
  id: string;
  name: string;
};

export type Location = {
  id: string;
  name: string;
};

export type UserPlay = {
  id: string;
  status: string;
  records: {
    id: string;
    status: RecordStatus;
    itemId: string;
  }[];
};
