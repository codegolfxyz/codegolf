import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers.js';

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    introspection: true, // TODO: Turn off outside of development
    plugins: [
        // TODO: Figure out how to integrate this plugin with Koa sub apps (difficult because no access to httpServer)
        // ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ]
});

await server.start();

const app = new Koa();
server.applyMiddleware({ app, path: "/" });

export default app;
