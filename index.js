import http from 'http';
import dotenv from 'dotenv';

import ModulesFactory from './src/modules.js';
import App from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

Promise.resolve(ModulesFactory())
.then(async (modules) => {
  const app = await App(modules);

  const server = http.createServer(app);
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
