/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCommentMutation
// ====================================================

export interface DeleteCommentMutation_deleteComment {
  __typename: "MutationResponse";
  ok: boolean;
}

export interface DeleteCommentMutation {
  deleteComment: DeleteCommentMutation_deleteComment;
}

export interface DeleteCommentMutationVariables {
  id: number;
}
