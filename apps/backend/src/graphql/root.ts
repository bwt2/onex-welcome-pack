import { user, users, createUser, login, User as UserClass } from "./resolvers/User.ts";
import { entry, entries, createEntry, Entry as EntryClass } from "./resolvers/Entry.ts";
import { challenge, challenges, createChallenge, Challenge as ChallengeClass } from "./resolvers/Challenge.ts";
import { gym, gyms, createGym, Gym as GymClass } from "./resolvers/Gym.ts";
import GraphQLJSON from 'graphql-type-json';
import { node } from "./resolvers/Node.ts";

export const root = {
    JSON: GraphQLJSON,
    
    node,

    login,

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
    createChallenge,

    User: {
        entries: (parent: UserClass, _args: any, context: any) => parent.entries(_args, context),
        homeGym: (parent: UserClass, _args: any, context: any) => parent.homeGym(_args, context),
    },
    Gym: {
        challenges: (parent: GymClass, _args: any, context: any) => parent.challenges(_args, context),
    },
    Challenge: {
        entries: (parent: ChallengeClass, _args: any, context: any) => parent.entries(_args, context),
        gym: (parent: ChallengeClass, _args: any, context: any) => parent.gym(_args, context),
    },
    Entry: {
        user: (parent: EntryClass, _args: any, context: any) => parent.user(_args, context),
        challenge: (parent: EntryClass, _args: any, context: any) => parent.challenge(_args, context),
    }
};