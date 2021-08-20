/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditUserInput } from "../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: EditUser
// ====================================================

export interface EditUser_editUser_User {
  __typename: "User";
  id: string;
}

export interface EditUser_editUser_UserNotFound {
  __typename: "UserNotFound";
  message: string;
}

export type EditUser_editUser = EditUser_editUser_User | EditUser_editUser_UserNotFound;

export interface EditUser {
  editUser: EditUser_editUser;
}

export interface EditUserVariables {
  input: EditUserInput;
}
