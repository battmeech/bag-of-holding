import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://purrito-bag-of-holding.herokuapp.com/",
  cache: new InMemoryCache(),
});
