/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me_User_campaigns {
  __typename: "Campaign";
  id: string;
  name: string;
}

export interface Me_me_User {
  __typename: "User";
  campaigns: Me_me_User_campaigns[];
}

export interface Me_me_UserNotFound {
  __typename: "UserNotFound";
  message: string;
}

export type Me_me = Me_me_User | Me_me_UserNotFound;

export interface Me {
  me: Me_me;
}
