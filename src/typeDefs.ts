import { Prisma, PrismaClient } from '@prisma/client';
import { gql } from 'apollo-server';

export type GQLContext = {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
};

export const typeDefs = gql`
  scalar Date

  type CreatedCampaign {
    id: ID!
  }

  type Item {
    id: ID!
    name: String!
    description: String
    quantity: Int!
    notes: String
    tags: [String!]!
    createdAt: Date!
    updatedAt: Date
  }

  type Campaign {
    id: ID!
    name: String!
    electrum: Int!
    platinum: Int!
    gold: Int!
    silver: Int!
    copper: Int!
    items: [Item!]
    createdAt: Date!
  }

  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    lastLogin: Date!
    createdAt: Date!
    updatedAt: Date
    campaigns: [Campaign!]!
  }

  type CampaignNotFound {
    message: String!
  }

  type ItemNotFound {
    message: String!
  }

  type UserNotFound {
    message: String!
  }

  type InvalidInput {
    message: String!
  }

  enum MoneyModification {
    ADD
    DEDUCT
  }

  input AddItemInput {
    name: String!
    description: String
    quantity: Int
    notes: String
    tags: [String!]
  }

  input EditItemInput {
    name: String
    description: String
    quantity: Int
    notes: String
    tags: [String!]
  }

  input RemoveItemInput {
    """
    ID of the item to be removed
    """
    id: ID!
  }

  input ModifyMoneyInput {
    modification: MoneyModification!
    electrum: Int!
    platinum: Int!
    gold: Int!
    silver: Int!
    copper: Int!
  }

  input LoginInput {
    email: String!
    firstName: String
    lastName: String
  }

  union FetchCampaignResult = Campaign | CampaignNotFound
  union AddItemResult = Campaign | CampaignNotFound
  union ModifyMoneyResult = Campaign | CampaignNotFound
  union RemoveItemResult = Campaign | ItemNotFound

  union FetchItemResult = Item | ItemNotFound
  union EditItemResult = Item | InvalidInput | ItemNotFound
  union AddTagResult = Item | ItemNotFound
  union RemoveTagResult = Item | ItemNotFound
  union MeResult = User | UserNotFound

  type Query {
    campaigns: [Campaign!]!
    campaign(campaignId: ID!): FetchCampaignResult!
    item(itemId: ID!): FetchItemResult
    me(userId: ID!): MeResult
  }

  type Mutation {
    createCampaign(name: String!): CreatedCampaign!
    modifyMoney(campaignId: ID!, input: ModifyMoneyInput!): ModifyMoneyResult!
    addItem(campaignId: ID!, input: AddItemInput!): AddItemResult!
    removeItem(itemId: ID!): RemoveItemResult!

    editItem(itemId: ID!, input: EditItemInput!): EditItemResult!
    addTag(itemId: ID!, tag: String!): AddTagResult!
    removeTag(itemId: ID!, tag: String!): RemoveTagResult!

    login(input: LoginInput!): User!
  }
`;
