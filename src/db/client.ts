import pg from "pg";

const client = new pg.Client();
await client.connect();
const res = await client.query('SELECT $1::text as message', ['Database connection successful!']);
console.log(res.rows[0].message);

export default client;
