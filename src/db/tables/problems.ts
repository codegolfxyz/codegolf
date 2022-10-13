import db from "../db.js";

export default async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS problems (
            id UUID DEFAULT gen_random_uuid(),
            title VARCHAR(100) NOT NULL,
            prompt VARCHAR(65536) NOT NULL,
            author_id UUID NOT NULL REFERENCES users,
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            PRIMARY KEY (id)
        )
    `);
    await db.query(`CREATE INDEX IF NOT EXISTS problems_by_author_ordered ON problems (author_id, created_at DESC)`);
    await db.query(`CREATE INDEX IF NOT EXISTS problems_ordered ON problems (created_at DESC)`);
};
