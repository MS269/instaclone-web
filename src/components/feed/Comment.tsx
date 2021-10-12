import { Link } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../sharedStyles";

interface ICommentProps {
  author: string;
  payload: string;
}

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Comment({ author, payload }: ICommentProps) {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload.split(" ").map((word, index) =>
          /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
            <Link key={index} to={`/hashtags/${word}`}>
              {word}&nbsp;
            </Link>
          ) : (
            <span key={index}>{word}&nbsp;</span>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
