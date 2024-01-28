// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import { DB_HOST, DB_NAME, DB_PORT } from "./const";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3005;

connectDB(DB_HOST, DB_PORT, DB_NAME);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
