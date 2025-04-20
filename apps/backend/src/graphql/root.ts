import { user, users, createUser, login, User as UserClass } from "./resolvers/User.ts";
import { entry, entries, createEntry, Entry as EntryClass } from "./resolvers/Entry.ts";
import { challenge, challenges, createChallenge, Challenge as ChallengeClass } from "./resolvers/Challenge.ts";
import { gym, gyms, createGym, Gym as GymClass } from "./resolvers/Gym.ts";
import GraphQLJSON from 'graphql-type-json';
import { node } from "./resolvers/Node.ts";
import { NodeInterface } from "./resolvers/NodeType.ts";

export const resolvers = {
    JSON: GraphQLJSON,

    Query: {
        node,
        user: (_parent, args) => user(args),
        users: (_parent, args) => users(),
        entry: (_parent, args) => entry(args),
        entries: (_parent, args) => entries(),
        gym: (_parent, args) => gym(args),
        gyms: (_parent, args) => gyms(),
        challenge: (_parent, args) => challenge(args),
        challenges: (_parent, args) => challenges(),
    },

    Mutation: {
        login: (_parent, args) => login(args),
        createUser: (_parent, args) => createUser(args),
        createEntry: (_parent, args) => createEntry(args),
        createGym: (_parent, args) => createGym(args),
        createChallenge: (_parent, args) => createChallenge(args),
    },

    Node: NodeInterface,
    
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