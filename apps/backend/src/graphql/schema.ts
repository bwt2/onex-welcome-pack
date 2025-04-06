import { buildSchema, GraphQLSchema } from 'graphql';
import path from 'path';
import { fileURLToPath } from 'url';
import { join } from 'path';
import { readFileSync } from 'fs';

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));
const schemaSDL: string = readFileSync(join(__dirname, './schema.graphql'), 'utf8');
export const schema: GraphQLSchema = buildSchema(schemaSDL);