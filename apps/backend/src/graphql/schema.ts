import { buildSchema, GraphQLSchema } from 'graphql';

export const schema: GraphQLSchema = buildSchema(`
    type Query {
        quoteOfTheDay: String
        random: Float!
        getDie(numSides: Int): RandomDie
        getMessage(id: ID!): Message
    }

    type Mutation {
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
    }

    type RandomDie {
        numSides: Int!
        rollOnce: Int!
        roll(numRolls: Int!): [Int]
    }

    type Message {
        id: ID!
        content: String
        author: String
    }

    input MessageInput {
        content: String
        author: String
    }
`);