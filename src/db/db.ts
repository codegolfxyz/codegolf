import pg from "pg";

const connectionString = `${process.env.DATABASE_URL!}?sslmode=require`;
const pool = new pg.Pool({ connectionString });
await pool.connect();
const res = await pool.query('SELECT $1::text as message', ['Database connection successful!']);
console.log(res.rows[0].message);

export default pool;
