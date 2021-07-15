/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditItemInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: EditItem
// ====================================================

export interface EditItem_editItem_InvalidInput {
  __typename: "InvalidInput";
}

export interface EditItem_editItem_Campaign_items {
  __typename: "Item";
  id: string;
  name: string;
  description: string | null;
  quantity: number;
}

export interface EditItem_editItem_Campaign {
  __typename: "Campaign";
  id: string;
  items: EditItem_editItem_Campaign_items[];
}

export interface EditItem_editItem_CampaignNotFound {
  __typename: "CampaignNotFound";
  message: string;
}

export type EditItem_editItem = EditItem_editItem_InvalidInput | EditItem_editItem_Campaign | EditItem_editItem_CampaignNotFound;

export interface EditItem {
  editItem: EditItem_editItem;
}

export interface EditItemVariables {
  id: string;
  input: EditItemInput;
}
