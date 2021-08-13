/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveItem
// ====================================================

export interface RemoveItem_removeItem_Campaign_items {
  __typename: "Item";
  id: string;
  name: string;
  description: string | null;
  quantity: number;
  notes: string | null;
}

export interface RemoveItem_removeItem_Campaign {
  __typename: "Campaign";
  id: string;
  items: RemoveItem_removeItem_Campaign_items[] | null;
}

export interface RemoveItem_removeItem_ItemNotFound {
  __typename: "ItemNotFound";
  message: string;
}

export type RemoveItem_removeItem = RemoveItem_removeItem_Campaign | RemoveItem_removeItem_ItemNotFound;

export interface RemoveItem {
  removeItem: RemoveItem_removeItem;
}

export interface RemoveItemVariables {
  id: string;
}
