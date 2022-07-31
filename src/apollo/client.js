import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "http://codegolf.xyz/",
  cache: new InMemoryCache(),
});
