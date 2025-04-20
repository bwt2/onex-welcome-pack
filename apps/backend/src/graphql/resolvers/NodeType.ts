import { User } from "./User.ts";
import { Entry } from "./Entry.ts";
import { Challenge } from "./Challenge.ts";
import { Gym } from "./Gym.ts";

export const NodeInterface  = {
  __resolveType(obj: any) {
    if (obj instanceof User) return "User";
    if (obj instanceof Entry) return "Entry";
    if (obj instanceof Challenge) return "Challenge";
    if (obj instanceof Gym) return "Gym";
    return null;
  }
};