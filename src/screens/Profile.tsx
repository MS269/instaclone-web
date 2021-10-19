import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useParams } from "react-router";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { Button, FatText } from "../components/sharedStyles";
import { PHOTO_FRAGMENT } from "../fragments";
import useUser from "../hooks/useUser";
import { FollowUserMutationVariables } from "../__generated__/FollowUserMutation";
import {
  SeeProfileQuery,
  SeeProfileQuery_seeProfile,
  SeeProfileQueryVariables,
} from "../__generated__/SeeProfileQuery";
import { UnfollowUserMutationVariables } from "../__generated__/UnfollowUserMutation";

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

const FOLLOW_USER_MUTATION = gql`
  mutation FollowUserMutation($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation UnfollowUserMutation($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

interface IPhotoProps {
  bg: string;
}

const ProfileBtn = styled(Button).attrs({
  as: "span",
})`
  margin-left: 10px;
  margin-top: 0px;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  margin-right: 150px;
  margin-left: 50px;
  background-color: #2c2c2c;
  height: 160px;
  width: 160px;
  border-radius: 50%;
`;

const Column = styled.div``;

const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin-right: 20px;
`;

const Value = styled(FatText)`
  font-size: 18px;
`;

const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<IPhotoProps>`
  position: relative;
  background-image: url(${(props) => props.bg});
  background-size: cover;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin: 0px 5px;
  font-size: 18px;
  svg {
    margin-right: 5px;
    font-size: 14px;
  }
`;

function Profile() {
  const { username }: SeeProfileQueryVariables = useParams();

  const { data, loading } = useQuery<SeeProfileQuery>(SEE_PROFILE_QUERY, {
    variables: { username },
  });

  const [unfollowUser] = useMutation<UnfollowUserMutationVariables>(
    UNFOLLOW_USER_MUTATION,
    {
      variables: { username },
    }
  );

  const [followUser] = useMutation<FollowUserMutationVariables>(
    FOLLOW_USER_MUTATION,
    {
      variables: { username },
    }
  );

  const client = useApolloClient();

  const { data: userData } = useUser();

  const clickUnfollowUser = async () => {
    const ok = await unfollowUser();
    if (!ok) {
      return;
    }
    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing() {
          return false;
        },
        totalFollowers(prev) {
          return prev - 1;
        },
      },
    });
    if (!userData) {
      return;
    }
    cache.modify({
      id: `User:${userData?.me?.username}`,
      fields: {
        totalFollowing(prev) {
          return prev - 1;
        },
      },
    });
  };

  const clickFollowUser = async () => {
    const ok = await followUser();
    if (!ok) {
      return;
    }
    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing() {
          return true;
        },
        totalFollowers(prev) {
          return prev + 1;
        },
      },
    });
    cache.modify({
      id: `User:${userData?.me?.username}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1;
        },
      },
    });
  };

  const getButton = ({ isMe, isFollowing }: SeeProfileQuery_seeProfile) => {
    if (isMe) {
      return <ProfileBtn>Edit Profile</ProfileBtn>;
    }
    if (isFollowing) {
      return (
        <ProfileBtn onClick={() => clickUnfollowUser()}>Unfollow</ProfileBtn>
      );
    } else {
      return <ProfileBtn onClick={() => clickFollowUser()}>Follow</ProfileBtn>;
    }
  };

  return (
    <div>
      <PageTitle
        title={
          loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`
        }
      />
      <Header>
        <Avatar src={data?.seeProfile?.avatar || ""} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? getButton(data.seeProfile) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {"  "}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos?.map((photo) => (
          <Photo key={photo?.id} bg={photo?.file || ""}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo?.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo?.commentNumber}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </div>
  );
}

export default Profile;
