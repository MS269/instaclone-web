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
  user: SeeFeedQuery_seeFeed_user;
  file: string;
  caption: string | null;
  likes: number;
  comments: (SeeFeedQuery_seeFeed_comments | null)[] | null;
  commentNumber: number;
  createdAt: string;
  isMine: boolean;
  isLiked: boolean;
}

export interface SeeFeedQuery {
  seeFeed: (SeeFeedQuery_seeFeed | null)[] | null;
}
