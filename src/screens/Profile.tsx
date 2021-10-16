import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router";
import { PHOTO_FRAGMENT } from "../fragments";
import { SeeProfileQueryVariables } from "../__generated__/SeeProfileQuery";

const SEE_PROFILE_QUERY = gql`
  query SeeProfileQuery($username: String!) {
    seeProfile(username: $username) {
      username
      firstName
      lastName
      bio
      avatar
      photos(page: 0) {
        ...PhotoFragment
      }
      totalFollowers
      totalFollowing
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

function Profile() {
  const { username }: SeeProfileQueryVariables = useParams();

  const { data } = useQuery<SeeProfileQueryVariables>(SEE_PROFILE_QUERY, {
    variables: { username },
  });

  console.log(data);

  return <div>{username}</div>;
}

export default Profile;
