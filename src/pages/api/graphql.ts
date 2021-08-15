export { graphqlProxy as default } from "api/graphql";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
