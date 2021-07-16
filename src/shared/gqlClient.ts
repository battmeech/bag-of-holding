import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

const uri =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ??
  "https://dev-bag-of-holding.herokuapp.com/";

export const client = new ApolloClient({
  link: new HttpLink({ uri, fetch }),
  cache: new InMemoryCache(),
});
