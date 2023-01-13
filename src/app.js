import express from 'express';

import ModulesFactory from './modules.js';
import Router from './routes/index.js';

export default async (modules) => {
  const router = await Router(modules);

  const app = express();
  app.use(router);

  return app;
}
