import './tables/problems.js';
import './tables/solutions.js';
import createUsers from './tables/users.js';
import createProblems from './tables/problems.js';
import seedDatabase from './seed.js';

import db from './db.js';

export default async () => {
    // TODO: Remove me after we implement problem creation, and start doing migrations instead so we don't lose data.
    await db.query(`DROP TABLE IF EXISTS problems`);
    await db.query(`DROP TABLE IF EXISTS solutions`);
    await db.query(`DROP TABLE IF EXISTS users`);

    await createUsers();
    await createProblems();
    await seedDatabase();

    console.log("Database setup complete.");
};
