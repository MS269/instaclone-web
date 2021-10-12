import sanitizeHtml from "sanitize-html";
import styled from "styled-components";
import { FatText } from "../sharedStyles";

interface ICommentProps {
  author: string;
  payload: string;
}

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
  mark {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Comment({ author, payload }: ICommentProps) {
  const cleanedPayload = sanitizeHtml(
    payload.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"),
    { allowedTags: ["mark"] }
  );

  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption dangerouslySetInnerHTML={{ __html: cleanedPayload }} />
    </CommentContainer>
  );
}

export default Comment;
