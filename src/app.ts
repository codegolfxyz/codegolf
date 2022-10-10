import express, { Express } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import auth from './auth/app.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, '../frontend/build')));
app.use('/oauth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
