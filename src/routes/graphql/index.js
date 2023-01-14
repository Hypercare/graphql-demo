import express from 'express';
import GraphQLHTTP, { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

import PublicGraphQL from './public.js';

const router = express.Router();

export default async (modules) => {
  const publicGraphQL = await PublicGraphQL(modules);

  const executableSchema = makeExecutableSchema({ typeDefs: publicGraphQL.schema, resolvers: publicGraphQL.resolverMap });
  const graphQLMiddleware = graphqlHTTP({
    schema: executableSchema,
    graphiql: true,
    pretty: true
  });

  router.get('/schema', (req, res) => {
    res.type('text').send(publicGraphQL.schema);
  });

  router.use('/', (req, res, next) => {
    graphQLMiddleware(req, res)
      .then(() => next())
      .catch(e => next(e));
  });

  return router;
}
