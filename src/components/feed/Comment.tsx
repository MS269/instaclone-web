import { ApolloCache, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DeleteCommentMutationVariables } from "../../__generated__/DeleteCommentMutation";
import { FatText } from "../sharedStyles";

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

interface ICommentProps {
  id?: number;
  photoId?: number;
  author: string;
  payload: string;
  isMine?: boolean;
}

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

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

const DeleteButton = styled.span`
  cursor: pointer;
`;

function Comment({ id, photoId, author, payload, isMine }: ICommentProps) {
  const updateDeleteComment = (cache: ApolloCache<any>, result: any) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commmentsNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };

  const [deleteCommentMutation] = useMutation<DeleteCommentMutationVariables>(
    DELETE_COMMENT_MUTATION,
    { variables: { id }, update: updateDeleteComment }
  );

  const onDeleteClick = () => deleteCommentMutation();

  return (
    <CommentContainer>
      <Link to={`users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CommentCaption>
        {payload.split(" ").map((word, index) =>
          /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
            <React.Fragment key={index}>
              <Link key={index} to={`/hashtags/${word}`}>
                {word}&nbsp;
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word}&nbsp;</React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? <DeleteButton onClick={onDeleteClick}>❌</DeleteButton> : null}
    </CommentContainer>
  );
}

export default Comment;
