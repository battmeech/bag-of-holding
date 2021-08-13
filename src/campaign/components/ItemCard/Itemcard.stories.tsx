import { SimpleGrid } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { itemBuilder as item } from "shared/generators/item";
import { ItemCard } from "./ItemCard";

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
  item: item(),
};
