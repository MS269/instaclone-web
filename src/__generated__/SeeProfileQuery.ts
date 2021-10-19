/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeeProfileQuery
// ====================================================

export interface SeeProfileQuery_seeProfile_photos {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
}

export interface SeeProfileQuery_seeProfile {
  __typename: "User";
  username: string;
  firstName: string;
  lastName: string | null;
  bio: string | null;
  avatar: string | null;
  photos: (SeeProfileQuery_seeProfile_photos | null)[] | null;
  totalFollowers: number;
  totalFollowing: number;
  isMe: boolean;
  isFollowing: boolean;
}

export interface SeeProfileQuery {
  seeProfile: SeeProfileQuery_seeProfile | null;
}

export interface SeeProfileQueryVariables {
  username: string;
}
