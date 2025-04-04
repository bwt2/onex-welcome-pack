import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' }); // don't like this

const app = express()
const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
	console.log(`Running on http://localhost:${PORT}`)
});

app.get("/", (req: Request, res: Response) => {
	res.send("Test")
});

