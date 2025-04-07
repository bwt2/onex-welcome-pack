import express, { Request, Response } from 'express';

import { ruruHTML } from 'ruru/server';
import { createHandler } from 'graphql-http/lib/use/express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { schema } from './graphql/schema.js';
import { root } from './graphql/root.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const PORT: number = Number(process.env.EXPRESS_PORT!) || 3000;
const app = express();
 
// handle all requests to /graphql
app.all(
  '/graphql',
  createHandler({
	schema: schema,
	rootValue: root,
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

// Run the GraphQL query '{ hello }' and print out the response
// graphql({
// 	schema,
// 	source: '{ hello }',
// 	rootValue,
// 	}).then((response) => {
// 	  console.log(response);
// 	});
   