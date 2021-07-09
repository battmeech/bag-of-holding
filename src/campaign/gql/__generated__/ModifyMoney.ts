/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ModifyMoneyInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ModifyMoney
// ====================================================

export interface ModifyMoney_modifyMoney_Campaign {
  __typename: "Campaign";
  id: string;
  electrum: number;
  platinum: number;
  gold: number;
  silver: number;
  copper: number;
}

export interface ModifyMoney_modifyMoney_CampaignNotFound {
  __typename: "CampaignNotFound";
  message: string;
}

export type ModifyMoney_modifyMoney = ModifyMoney_modifyMoney_Campaign | ModifyMoney_modifyMoney_CampaignNotFound;

export interface ModifyMoney {
  modifyMoney: ModifyMoney_modifyMoney;
}

export interface ModifyMoneyVariables {
  id: string;
  input: ModifyMoneyInput;
}
