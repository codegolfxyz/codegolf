import pg from "pg";

const connectionString = process.env.DATABASE_URL!;
const localhost = /.*localhost.*/.test(connectionString);
const useSSL = !localhost;
const pool = useSSL
    ? new pg.Pool({
        connectionString,
        ssl: { requestCert: true, rejectUnauthorized: false }
    })
    : new pg.Pool({ connectionString });

await pool.connect();
const res = await pool.query('SELECT $1::text as message', ['Database connection successful!']);
console.log(res.rows[0].message);

export default pool;
