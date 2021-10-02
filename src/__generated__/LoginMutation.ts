/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  __typename: "LoginResponse";
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface LoginMutation {
  login: LoginMutation_login;
}

export interface LoginMutationVariables {
  username: string;
  password: string;
}
