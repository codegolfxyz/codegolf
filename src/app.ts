import Koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import auth from './auth/app.js';
import './db/setup.js';

const app = new Koa();

app.use(serve('../frontend/build'));
app.use(mount('/oauth', auth));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
