export { graphqlProxy as default } from "api";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
