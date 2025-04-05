import express, { Request, Response } from 'express';
import { main } from "./test.js";

const PORT: number = Number(process.env.PORT) || 3000;
const app = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Test")
});

app.listen(PORT, () => {
	console.log(`Running on http://localhost:${PORT}`)
});

main();