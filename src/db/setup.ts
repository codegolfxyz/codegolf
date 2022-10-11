import db from "./db.js";

// TODO: Remove me after we implement user creation.
await db.query(`DROP TABLE users`);

try {
    await db.query("SELECT 42 FROM users WHERE username = 'nardi'");
} catch {
    await db.query(`
        CREATE TABLE users (
            id uuid DEFAULT gen_random_uuid(),
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            PRIMARY KEY (id)
        )
    `);
    await db.query('CREATE UNIQUE INDEX users_by_username ON users (username)');
    await db.query(`CREATE INDEX users_by_username_and_password ON users (username, password)`);

    // seed database with admin users
    await db.query(`INSERT INTO users (username, password) VALUES ('nardi', 'hunter2')`);
    await db.query(`INSERT INTO users (username, password) VALUES ('pickles', 'hunter3')`);
    await db.query(`INSERT INTO users (username, password) VALUES ('badger', 'hunter4')`);
}

const res = await db.query('SELECT $1::text as message', ['Database setup complete!']);
console.log(res.rows[0].message);

const users = await db.query(`SELECT * FROM users`);
console.log(users.rows);
