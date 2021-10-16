import { ApolloCache, useMutation } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  SeeFeedQuery_seeFeed_comments,
  SeeFeedQuery_seeFeed_user,
} from "../../__generated__/SeeFeedQuery";
import Avatar from "../Avatar";
import { FatText } from "../sharedStyles";
import Comments from "./Comments";

const TOGGLE_LIKE_MUTATION = gql`
  mutation ToggleLikeMutation($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

interface IPhotoProps {
  id: number;
  user: SeeFeedQuery_seeFeed_user;
  file: string;
  caption: string | null;
  likes: number;
  comments: (SeeFeedQuery_seeFeed_comments | null)[] | null;
  commentNumber: number;
  isLiked: boolean;
}

const PhotoContainer = styled.div`
  background-color: white;
  margin-bottom: 60px;
  max-width: 615px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
`;

const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  max-width: 100%;
  min-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 15px;
`;

function Photo({
  id,
  user,
  file,
  caption,
  likes,
  comments,
  commentNumber,
  isLiked,
}: IPhotoProps) {
  const updateToggleLike = (cache: ApolloCache<any>, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            return prev + (isLiked ? -1 : 1);
          },
        },
      });
    }
  };

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { id },
    update: updateToggleLike,
  });

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/users/${user.username}`}>
          <Avatar url={user.avatar || ""} lg />
        </Link>
        <Link to={`/users/${user.username}`}>
          <Username>{user.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file} alt={`${user.username}'s Photo'`} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? " 1 like" : `${likes} likes`}</Likes>
        <Comments
          photoId={id}
          author={user.username}
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
}

export default Photo;
