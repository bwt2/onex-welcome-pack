import path from 'path';
import { fileURLToPath } from 'url';
import { join } from 'path';
import { readFileSync } from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './root.ts'; // formerly `root`

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));
const typeDefs: string = readFileSync(join(__dirname, './schema.graphql'), 'utf8');
// export const schema: GraphQLSchema = buildSchema(schemaSDL);

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});