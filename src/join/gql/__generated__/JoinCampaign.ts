/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: JoinCampaign
// ====================================================

export interface JoinCampaign_joinCampaign_CampaignNotFound {
  __typename: "CampaignNotFound" | "UserNotFound";
}

export interface JoinCampaign_joinCampaign_Campaign {
  __typename: "Campaign";
  id: string;
}

export type JoinCampaign_joinCampaign = JoinCampaign_joinCampaign_CampaignNotFound | JoinCampaign_joinCampaign_Campaign;

export interface JoinCampaign {
  joinCampaign: JoinCampaign_joinCampaign;
}

export interface JoinCampaignVariables {
  campaignId: string;
}
