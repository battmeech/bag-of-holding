/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchCampaign
// ====================================================

export interface FetchCampaign_fetchCampaign_Campaign_items {
  __typename: "Item";
  id: string;
  name: string;
  description: string | null;
  quantity: number;
}

export interface FetchCampaign_fetchCampaign_Campaign {
  __typename: "Campaign";
  id: string;
  name: string;
  electrum: number;
  platinum: number;
  gold: number;
  silver: number;
  copper: number;
  items: FetchCampaign_fetchCampaign_Campaign_items[];
}

export interface FetchCampaign_fetchCampaign_CampaignNotFound {
  __typename: "CampaignNotFound";
  message: string;
}

export type FetchCampaign_fetchCampaign = FetchCampaign_fetchCampaign_Campaign | FetchCampaign_fetchCampaign_CampaignNotFound;

export interface FetchCampaign {
  fetchCampaign: FetchCampaign_fetchCampaign;
}

export interface FetchCampaignVariables {
  id: string;
}
