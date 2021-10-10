import styled from "styled-components";
import { FatText } from "../sharedStyles";

interface ICommentProps {
  author: string;
  payload: string;
}

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

function Comment({ author, payload }: ICommentProps) {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
