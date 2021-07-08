import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ??
  "https://dev-bag-of-holding.herokuapp.com/";

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});
