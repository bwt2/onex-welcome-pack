import express, { Request, Response } from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
// import { eq } from 'drizzle-orm';
// import { usersTable } from './db/schema.js';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' }); // don't like this

const PORT: number = Number(process.env.PORT) || 3000;
const app = express()

app.get("/", (req: Request, res: Response) => {
	res.send("Test")
});

app.listen(PORT, () => {
	console.log(`Running on http://localhost:${PORT}`)
});

// const db = drizzle(process.env.DATABASE_URL!);
