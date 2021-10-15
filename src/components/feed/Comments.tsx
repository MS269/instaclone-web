import styled from "styled-components";
import Comment from "./Comment";
import { SeeFeedQuery_seeFeed_comments } from "../../__generated__/SeeFeedQuery";
import { SubmitHandler, useForm } from "react-hook-form";
import gql from "graphql-tag";
import { ApolloCache, useMutation } from "@apollo/client";
import { CreateCommentMutationVariables } from "../../__generated__/CreateCommentMutation";
import useUser from "../../hooks/useUser";

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateCommentMutation($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

interface ICommentsProps {
  photoId: number;
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

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

function Comments({
  photoId,
  author,
  caption,
  commentNumber,
  comments,
}: ICommentsProps) {
  const { data: userData } = useUser();

  const createCommentUpdate = (cache: ApolloCache<any>, result: any) => {
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    const { payload } = getValues();
    setValue("payload", "");
    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        id,
        createdAt: Date.now(),
        isMine: true,
        payload,
        user: { ...userData.me },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment Comment on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };

  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    { update: createCommentUpdate }
  );

  const { register, handleSubmit, setValue, getValues } =
    useForm<CreateCommentMutationVariables>();

  const onSubmitValid: SubmitHandler<CreateCommentMutationVariables> = ({
    payload,
  }) => {
    if (loading) {
      return;
    }
    createCommentMutation({ variables: { photoId, payload } });
  };

  return (
    <CommentsContainer>
      <Comment author={author} payload={caption || ""} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment?.id}
          id={comment?.id}
          photoId={photoId}
          author={comment?.user?.username || ""}
          payload={comment?.payload || ""}
          isMine={comment?.isMine}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <PostCommentInput
            type="text"
            placeholder="Write a comment"
            {...register("payload", { required: true })}
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
}

export default Comments;
