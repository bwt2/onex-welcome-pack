import express, { Request, Response } from 'express';

import { ruruHTML } from 'ruru/server';
import { createHandler } from 'graphql-http/lib/use/express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { schema } from './graphql/schema.js';
import { root } from './graphql/root.js';
import { createChallengesByGymIdLoader } from './loaders/createChallengesByGymIdLoader.ts';
import { createEntriesByUserIdLoader } from './loaders/createEntriesByUserIdLoader.ts';
import { createEntriesByChallengeIdLoader } from './loaders/createEntriesByChallengeIdLoader.ts';
import { createGymByGymIdLoader } from './loaders/createGymByGymIdLoader.ts';
import { createUserByUserIdLoader } from './loaders/createUserByUserIdLoader.ts';
import { createChallengeByChallengeIdLoader } from './loaders/createChallengeByChallengeIdLoader.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const PORT: number = Number(process.env.EXPRESS_PORT!) || 3000;
const app = express();
 
// handle all requests to /graphql
// NOTE: dataloaders aren't passed directly, instead use factory function to ensure new dataloader is used per request (so cross-request batching doesn't occur)
// NOTE: A batch loading function accepts an Array of keys, and returns a Promise which resolves to an Array of values or Error instances. The loader itself is provided as the this context. 
// https://github.com/graphql/dataloader?tab=readme-ov-file#batch-function
app.all(
  '/graphql',
  createHandler({
	schema: schema,
	rootValue: root,
	context: () => ({
		loaders: {
		  challengesByGymId: createChallengesByGymIdLoader(), 
		  entriesByUserId: createEntriesByUserIdLoader(), 
		  entriesByChallengeId: createEntriesByChallengeIdLoader(),
		  gymByGymId: createGymByGymIdLoader(),
		  userByUserId: createUserByUserIdLoader(),
		  challengeByChallengeId: createChallengeByChallengeIdLoader(),
		}
	}),
  }),
);

// serve RURU / GraphiQL IDE
app.get('/', (_req: Request, res: Response) => {
	res.type('html');
	res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(PORT, () => {
	console.log(`GraphQL running on http://localhost:${PORT}`)
});