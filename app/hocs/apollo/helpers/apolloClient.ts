// Libraries
import { sha256 } from "crypto-hash";
import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { createHttpLink } from "@apollo/client/link/http";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import fetch from "isomorphic-unfetch";

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    cache: new InMemoryCache().restore(initialState ?? {}),
    link: ApolloLink.from([
      createPersistedQueryLink({ sha256 }),
      createHttpLink({ uri: "http://localhost:4000", fetch }),
    ]),
    assumeImmutableResults: true,
  });
}
