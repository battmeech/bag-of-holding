import { build, fake } from "@jackfranklin/test-data-bot";
import { FetchCampaign_fetchCampaign_Campaign_items as Item } from "campaign/gql";

export const itemBuilder = build<Item>({
  fields: {
    __typename: "Item",
    description: fake((f) => f.company.catchPhrase()),
    name: fake((f) => f.commerce.product()),
    id: fake((f) => f.random.uuid()),
    quantity: fake((f) => f.random.number(20)),
  },
});
