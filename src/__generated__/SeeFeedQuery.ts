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

export interface SeeFeedQuery_seeFeed_comments_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface SeeFeedQuery_seeFeed_comments {
  __typename: "Comment";
  id: number;
  user: SeeFeedQuery_seeFeed_comments_user;
  payload: string;
  isMine: boolean;
  createdAt: string;
}

export interface SeeFeedQuery_seeFeed {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  user: SeeFeedQuery_seeFeed_user;
  caption: string | null;
  comments: (SeeFeedQuery_seeFeed_comments | null)[] | null;
  createdAt: string;
  isMine: boolean;
}

export interface SeeFeedQuery {
  seeFeed: (SeeFeedQuery_seeFeed | null)[] | null;
}
