/* istanbul ignore file */
import {
  FetchCampaign_fetchCampaign_Campaign_items as Item,
  FetchCampaign_fetchCampaign_Campaign as Campaign,
} from "campaign/gql";

export const createItem = ({
  name = "Test name",
  description = "Test description",
  quantity = 1,
  id = "item-id",
  notes = "notes",
}: {
  name?: string;
  description?: string;
  quantity?: number;
  id?: string;
  notes?: string;
}): Item => {
  return {
    __typename: "Item",
    id,
    name,
    description,
    quantity,
    notes,
  };
};

export const createCampaign = (): Campaign => ({
  __typename: "Campaign",
  id: "campaign-id",
  items: [
    {
      __typename: "Item",
      id: "item-a",
      description: "item description",
      name: "item name",
      quantity: 1,
      notes: "notes",
    },
  ],
  copper: 20,
  silver: 25,
  electrum: 30,
  gold: 40,
  platinum: 45,
  name: "This is my campaign",
});
