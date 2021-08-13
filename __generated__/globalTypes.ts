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
  notes?: string | null;
  tags?: string[] | null;
}

export interface EditItemInput {
  name?: string | null;
  description?: string | null;
  quantity?: number | null;
  notes?: string | null;
  tags?: string[] | null;
}

export interface ModifyMoneyInput {
  modification: MoneyModification;
  electrum: number;
  platinum: number;
  gold: number;
  silver: number;
  copper: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
