import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { SeeFeedQuery_seeFeed } from "../__generated__/SeeFeedQuery";

const FEED_QUERY = gql`
  query SeeFeedQuery {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

function Home() {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo: SeeFeedQuery_seeFeed) => (
        <Photo
          key={photo.id}
          id={photo.id}
          user={photo.user}
          file={photo.file}
          caption={photo.caption}
          likes={photo.likes}
          comments={photo.comments}
          commentNumber={photo.commentNumber}
          isLiked={photo.isLiked}
        />
      ))}
    </div>
  );
}

export default Home;
