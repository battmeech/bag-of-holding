import { addItem } from './addItem';
import { addTag } from './addTag';
import { campaign } from './campaign';
import { campaigns, userCampaigns } from './campaigns';
import { createCampaign } from './createCampaign';
import { editItem } from './editItem';
import { item } from './item';
import { items } from './items';
import { modifyMoney } from './modifyMoney';
import { removeItem } from './removeItem';
import { removeTag } from './removeTag';
import { dateScalar, Resolvers } from './shared';
import { login } from './login';
import { me } from './me';

export const resolvers: Resolvers = {
  Campaign: { items },
  Mutation: {
    createCampaign,
    modifyMoney,
    addItem,
    removeItem,
    editItem,
    addTag,
    removeTag,
    login,
  },
  Query: {
    campaigns,
    campaign,
    item,
    me,
  },
  User: {
    campaigns: userCampaigns,
  },
  Date: dateScalar,
};
