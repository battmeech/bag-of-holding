import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ItemCard } from './ItemCard';

export default {
  title: 'Components/Item Card',
  component: ItemCard,
} as ComponentMeta<typeof ItemCard>;

const Template: ComponentStory<typeof ItemCard> = (args) => <ItemCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    campaignId: 'abc123',
    item: {
        __typename: 'Item',
        description: 'This is an item description',
        id: '1',
        name: 'Epic Item',
        quantity: 2
    }
};
