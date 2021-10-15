/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Comment
// ====================================================

export interface Comment_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface Comment {
  __typename: "Comment";
  id: number;
  createdAt: string;
  isMine: boolean;
  payload: string;
  user: Comment_user;
}
