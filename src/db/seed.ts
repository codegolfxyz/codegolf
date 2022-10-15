import db from './db.js';

export default async () => {
    await db.query(`
        INSERT INTO users (username, password) VALUES ('nardi', 'hunter2');
        INSERT INTO users (username, password) VALUES ('pickles', 'hunter3');
        INSERT INTO users (username, password) VALUES ('badger', 'hunter4');

        INSERT INTO problems (title, prompt, author_id) SELECT 'Tap the Monkey', 'Tap him I say.', users.id FROM users WHERE username = 'nardi';
    `);
};
