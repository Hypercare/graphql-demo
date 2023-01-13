import express from 'express';

import BootstrapFactory from './bootstrap/index.js';
import GraphQLRouter from './graphql/index.js';

const router = express.Router();

export default async (modules) => {
  const bootstrap = BootstrapFactory(modules);
  const graphQLRouter = GraphQLRouter(modules);

  router.use(bootstrap.load);

  router.get('/health_check', (req, res) => {
    res.status(200).json({ db: 'healthy', searchService: 'healthy' });
  });

  router.use('/graphql', graphQLRouter);

  return router;
}
