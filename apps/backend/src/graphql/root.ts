import { user, users, createUser } from "./resolvers/User.ts";
import { entries } from "./resolvers/Entry.ts";
import { challenges } from "./resolvers/Challenge.ts";
import { gyms } from "./resolvers/Gym.ts";

export const root = {
    user,
    users,
    createUser,
    entries,
    gyms,
    challenges
};