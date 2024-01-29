import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import path from "path";
import { productResolvers } from "./product/product.resolver";

// Load and merge the type definitions
const typesArray = loadFilesSync(path.join(__dirname, "./"), {
  extensions: ["graphql"],
});
const typeDefs = mergeTypeDefs(typesArray);

// Merge the resolvers
const resolvers = { ...productResolvers };

// Create the executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
