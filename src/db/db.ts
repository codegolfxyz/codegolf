import pg from "pg";

const url = process.env.DATABASE_URL!;
const localhost = /.*localhost.*/.test(url);
const reviewApp = !!process.env.HEROKU_PR_NUMBER;
const useSSL = !localhost && !reviewApp;
const pool = useSSL
    ? new pg.Pool({
        connectionString: `${url}?sslmode=require`,
        ssl: { rejectUnauthorized: false }
    })
    : new pg.Pool({ connectionString: url });

await pool.connect();
const res = await pool.query('SELECT $1::text as message', ['Database connection successful!']);
console.log(res.rows[0].message);

export default pool;
