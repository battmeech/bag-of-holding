import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ItemCard } from "./ItemCard";
import { itemBuilder as item } from "shared/generators/item";
import { SimpleGrid } from "@chakra-ui/react";

export default {
  title: "Components/Item Card",
  component: ItemCard,
} as ComponentMeta<typeof ItemCard>;

const Template: ComponentStory<typeof ItemCard> = (args) => (
  <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 4 }} spacing={4} mb={6}>
    <ItemCard {...args} />
    <ItemCard {...args} />
  </SimpleGrid>
);

export const Default = Template.bind({});
Default.args = {
  campaignId: "abc123",
  item: item(),
};
