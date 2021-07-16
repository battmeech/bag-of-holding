import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ItemCard } from "./ItemCard";
import { itemBuilder as item } from "shared/generators/item";

export default {
  title: "Components/Item Card",
  component: ItemCard,
} as ComponentMeta<typeof ItemCard>;

const Template: ComponentStory<typeof ItemCard> = (args) => (
  <ItemCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  campaignId: "abc123",
  item: item(),
};
