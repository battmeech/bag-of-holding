/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddItemInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddItem
// ====================================================

export interface AddItem_addItem_Campaign_items {
  __typename: "Item";
  id: string;
  name: string;
  description: string | null;
  quantity: number;
}

export interface AddItem_addItem_Campaign {
  __typename: "Campaign";
  id: string;
  items: AddItem_addItem_Campaign_items[];
}

export interface AddItem_addItem_CampaignNotFound {
  __typename: "CampaignNotFound";
  message: string;
}

export type AddItem_addItem = AddItem_addItem_Campaign | AddItem_addItem_CampaignNotFound;

export interface AddItem {
  addItem: AddItem_addItem;
}

export interface AddItemVariables {
  id: string;
  input: AddItemInput;
}
