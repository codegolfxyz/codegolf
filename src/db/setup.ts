import client from "./client.js";

// TODO: Remove me after we implement user creation.
await client.query(`DROP TABLE users`);

try {
    await client.query("SELECT 42 FROM users WHERE username = 'nardi'");
} catch {
    await client.query(`
        CREATE TABLE users (
            id uuid DEFAULT gen_random_uuid(),
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            PRIMARY KEY (id)
        )
    `);
    await client.query('CREATE UNIQUE INDEX users_by_username ON users (username)');
    await client.query(`CREATE INDEX users_by_username_and_password ON users (username, password)`);

    // seed database with admin users
    await client.query(`INSERT INTO users (username, password) VALUES ('nardi', 'hunter2')`);
    await client.query(`INSERT INTO users (username, password) VALUES ('pickles', 'hunter3')`);
    await client.query(`INSERT INTO users (username, password) VALUES ('badger', 'hunter4')`);
}

const res = await client.query('SELECT $1::text as message', ['Database setup complete!']);
console.log(res.rows[0].message);

const users = await client.query(`SELECT * FROM users`);
console.log(users.rows);
