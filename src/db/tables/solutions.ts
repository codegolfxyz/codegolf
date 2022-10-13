import db from "../db.js";

export default async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS solutions (
            id UUID DEFAULT gen_random_uuid(),
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            author_id UUID NOT NULL REFERENCES users,
            problem_id UUID NOT NULL REFERENCES problems,
            code NOT NULL VARCHAR(65536),
            PRIMARY KEY (id)
        )
    `);
    await db.query(`CREATE INDEX IF NOT EXISTS solutions_by_problem_ordered ON solutions (problem_id, created_at DESC)`);
};