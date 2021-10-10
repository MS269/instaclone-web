import styled from "styled-components";
import Comment from "./Comment";
import { SeeFeedQuery_seeFeed_comments } from "../../__generated__/SeeFeedQuery";

interface ICommentsProps {
  author: string;
  caption: string | null;
  commentNumber: number;
  comments: (SeeFeedQuery_seeFeed_comments | null)[] | null;
}

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  display: block;
  margin: 10px 0px;
  opacity: 0.7;
  font-size: 12px;
  font-weight: 600;
`;

function Comments({
  author,
  caption,
  commentNumber,
  comments,
}: ICommentsProps) {
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption || ""} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment?.id}
          author={comment?.user?.username || ""}
          payload={caption || ""}
        />
      ))}
    </CommentsContainer>
  );
}

export default Comments;
