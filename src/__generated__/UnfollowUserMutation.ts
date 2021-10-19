/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnfollowUserMutation
// ====================================================

export interface UnfollowUserMutation_unfollowUser {
  __typename: "MutationResponse";
  ok: boolean;
}

export interface UnfollowUserMutation {
  unfollowUser: UnfollowUserMutation_unfollowUser;
}

export interface UnfollowUserMutationVariables {
  username: string;
}
