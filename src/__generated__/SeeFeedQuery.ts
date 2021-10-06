/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeeFeedQuery
// ====================================================

export interface SeeFeedQuery_seeFeed_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface SeeFeedQuery_seeFeed {
  __typename: "Photo";
  id: number;
  user: SeeFeedQuery_seeFeed_user;
  file: string;
  caption: string | null;
  likes: number;
  comments: number;
  createdAt: string;
  isMine: boolean;
  isLiked: boolean;
}

export interface SeeFeedQuery {
  seeFeed: (SeeFeedQuery_seeFeed | null)[] | null;
}
