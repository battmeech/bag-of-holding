/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CheckCampaignExists
// ====================================================

export interface CheckCampaignExists_campaign {
  __typename: "Campaign" | "CampaignNotFound";
}

export interface CheckCampaignExists {
  campaign: CheckCampaignExists_campaign;
}

export interface CheckCampaignExistsVariables {
  id: string;
}
