// src/index.js
import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import { DB_HOST, DB_NAME, DB_PORT } from "./const";
import schema from "./schema";
import { graphqlHTTP } from "express-graphql";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3005;

connectDB(DB_HOST, DB_PORT, DB_NAME);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true, // Enable GraphiQL interface for easy testing
  })
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
