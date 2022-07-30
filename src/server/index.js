const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');

// we must convert the file Buffer to a UTF-8 string
const typeDefs = gql`
type Problem {
    title: String!
    prompt: String!
    author: String!
    code: String!
    solutions: [Solution] @relation
  }

  type Solution {
    author: String!
    code: String!
    problem: Problem
  }

  type Query {
    allProblems: [Problem!]
    allSolutions: [Solution!]
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    allProblems: () => [],
    allSolutions: () => []
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});