import { Tag } from "./tag";

export interface Member {
  id?: number;
  name: string | null;
  description: string | null;
  image: string | null;
  tags?: Tag[];
  tagIds?: number[];
}
