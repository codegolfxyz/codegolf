import Koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import api from './api/app.js';
import auth from './auth/app.js';
import setUpDatabase from './db/setup.js';

await setUpDatabase();

const app = new Koa();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(serve(path.resolve(__dirname, '../frontend/build')));
app.use(mount('/oauth', auth));
app.use(mount('/api', api));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
