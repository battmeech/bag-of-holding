/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchCampaign
// ====================================================

export interface FetchCampaign_campaign_Campaign_items {
  __typename: "Item";
  id: string;
  name: string;
  description: string | null;
  quantity: number;
  notes: string | null;
  createdAt: Date;
  tags: string[];
}

export interface FetchCampaign_campaign_Campaign {
  __typename: "Campaign";
  id: string;
  name: string;
  electrum: number;
  platinum: number;
  gold: number;
  silver: number;
  copper: number;
  items: FetchCampaign_campaign_Campaign_items[] | null;
}

export interface FetchCampaign_campaign_CampaignNotFound {
  __typename: "CampaignNotFound";
  message: string;
}

export type FetchCampaign_campaign = FetchCampaign_campaign_Campaign | FetchCampaign_campaign_CampaignNotFound;

export interface FetchCampaign {
  campaign: FetchCampaign_campaign;
}

export interface FetchCampaignVariables {
  id: string;
}
