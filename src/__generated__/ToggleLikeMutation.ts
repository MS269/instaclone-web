/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleLikeMutation
// ====================================================

export interface ToggleLikeMutation_toggleLike {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface ToggleLikeMutation {
  toggleLike: ToggleLikeMutation_toggleLike;
}

export interface ToggleLikeMutationVariables {
  id: number;
}
