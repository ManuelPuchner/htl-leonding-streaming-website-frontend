import { Tag } from "./tag";

export interface Member {
  id: number;
  name: string | null;
  tags: Tag[];
}
