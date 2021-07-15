/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum MoneyModification {
  ADD = "ADD",
  DEDUCT = "DEDUCT",
}

export interface AddItemInput {
  name: string;
  description?: string | null;
  quantity?: number | null;
}

export interface EditItemInput {
  id: string;
  name?: string | null;
  description?: string | null;
  quantity?: number | null;
}

export interface ModifyMoneyInput {
  modification: MoneyModification;
  electrum: number;
  platinum: number;
  gold: number;
  silver: number;
  copper: number;
}

export interface RemoveItemInput {
  id: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
