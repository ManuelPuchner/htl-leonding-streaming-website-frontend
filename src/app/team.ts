import { Member } from "./member";

export interface Team {
  name: string;
  members: Member[];
  description: string | undefined;
  image: string | undefined;
}
