import { user, users, createUser } from "./resolvers/User.ts";
import { entry, entries, createEntry } from "./resolvers/Entry.ts";
import { challenge, challenges, createChallenge } from "./resolvers/Challenge.ts";
import { gym, gyms, createGym } from "./resolvers/Gym.ts";
import GraphQLJSON from 'graphql-type-json';

export const root = {
    JSON: GraphQLJSON,

    user,
    users,
    createUser,
    
    entry,
    entries,
    createEntry,
    
    gym,
    gyms,
    createGym,

    challenge,
    challenges,
    createChallenge
};