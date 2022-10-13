import db from "../db.js";

export default async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id uuid DEFAULT gen_random_uuid(),
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            PRIMARY KEY (id)
        )
    `);
    await db.query('CREATE UNIQUE INDEX IF NOT EXISTS users_by_username ON users (username)');
    await db.query(`CREATE INDEX IF NOT EXISTS users_by_username_and_password ON users (username, password)`);
};
