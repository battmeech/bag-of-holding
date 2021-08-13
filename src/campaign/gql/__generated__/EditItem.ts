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

export interface EditItem_editItem_Item {
  __typename: "Item";
  id: string;
  name: string;
  description: string | null;
  quantity: number;
  notes: string | null;
}

export interface EditItem_editItem_ItemNotFound {
  __typename: "ItemNotFound";
  message: string;
}

export type EditItem_editItem = EditItem_editItem_InvalidInput | EditItem_editItem_Item | EditItem_editItem_ItemNotFound;

export interface EditItem {
  editItem: EditItem_editItem;
}

export interface EditItemVariables {
  id: string;
  input: EditItemInput;
}
