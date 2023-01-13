import BootstrapFactory from './bootstrap/index.js';

import express from 'express';
const router = express.Router();

export default async (modules) => {
  const bootstrap = BootstrapFactory(modules);

  router.use(bootstrap.load);

  router.get('/health_check', (req, res) => {
    res.status(200).json({ db: 'healthy', searchService: 'healthy' });
  });

  return router;
}
