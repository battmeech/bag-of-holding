/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCampaign
// ====================================================

export interface CreateCampaign_createCampaign_InvalidInput {
  __typename: "InvalidInput";
}

export interface CreateCampaign_createCampaign_Campaign {
  __typename: "Campaign";
  id: string;
}

export type CreateCampaign_createCampaign = CreateCampaign_createCampaign_InvalidInput | CreateCampaign_createCampaign_Campaign;

export interface CreateCampaign {
  createCampaign: CreateCampaign_createCampaign;
}

export interface CreateCampaignVariables {
  name: string;
}
