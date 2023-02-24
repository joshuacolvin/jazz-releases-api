import { ApolloServer } from "apollo-server";
import { schema } from "./schema/schema";
import { Resolvers } from "./resolvers";

const port = process.env.PORT || 9090;

const server = new ApolloServer({ typeDefs: schema, resolvers: Resolvers });

server.listen({ port }, () =>
  console.log(`Server runs at: http://localhost:${port}`)
);
