/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddUser
// ====================================================

export interface AddUser_addUser_CampaignNotFound {
  __typename: "CampaignNotFound" | "UserNotFound";
}

export interface AddUser_addUser_Campaign {
  __typename: "Campaign";
  id: string;
}

export type AddUser_addUser = AddUser_addUser_CampaignNotFound | AddUser_addUser_Campaign;

export interface AddUser {
  addUser: AddUser_addUser;
}

export interface AddUserVariables {
  campaignId: string;
}
