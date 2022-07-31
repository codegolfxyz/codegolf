import express from "express";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
