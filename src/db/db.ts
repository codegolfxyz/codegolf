import pg from "pg";

console.log("HEYOOOOOO");
console.log(process.env.DATABASE_URL);

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
await pool.connect();
const res = await pool.query('SELECT $1::text as message', ['Database connection successful!']);
console.log(res.rows[0].message);

export default pool;
