/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCommentMutation
// ====================================================

export interface CreateCommentMutation_createComment {
  __typename: "MutationResponse";
  ok: boolean;
  id: number | null;
  error: string | null;
}

export interface CreateCommentMutation {
  createComment: CreateCommentMutation_createComment;
}

export interface CreateCommentMutationVariables {
  photoId: number;
  payload: string;
}
