import db from '../db/db.js';
import { Resolvers, Problem, User, Solution } from '../generated/graphql.js';

export const resolvers: Resolvers = {
    Query: {
        // https://www.apollographql.com/docs/apollo-server/data/resolvers
        async problems() {
            const result = await db.query("SELECT author_id as author, * FROM problems ORDER BY created_at DESC");
            return result.rows as [Problem];
        },
        async problem(_, { id }) {
            const result = await db.query("SELECT * FROM problems WHERE id = $1", [id]);
            return result.rows[0] as Problem;
        },
        async user(_, { id }) {
            const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
            return result.rows[0] as User;
        },
        async solution(_, { id }) {
            const result = await db.query("SELECT * FROM solutions WHERE id = $1", [id]);
            return result.rows[0] as Solution;
        }
    },
    Problem: {
        async author(problem) {
            const result = await db.query("SELECT users.* FROM users, problems WHERE users.id = problems.author_id AND problems.id = $1", [problem.id]);
            return result.rows[0] as User;
        }
    }
};
