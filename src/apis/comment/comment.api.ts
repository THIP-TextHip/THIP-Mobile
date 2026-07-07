import { apiClient } from "../api-client";
import { COMMENT_URL } from "../endpoint";
import type {
  ChangeCommentLikeStatusRequest,
  ChangeCommentLikeStatusResponse,
  CommentType,
  DeleteCommentRequest,
  DeleteCommentResponse,
  GetCommentListRequest,
  GetCommentListResponse,
  WriteCommentRequest,
} from "./comment.types";

export const getCommentListApi = async ({
  postId,
  postType,
  cursor,
}: GetCommentListRequest) => {
  const response = await apiClient.get<GetCommentListResponse>(
    COMMENT_URL.DEFAULT(postId),
    {
      params: {
        postType,
        ...(cursor == null ? {} : { cursor }),
      },
    },
  );

  return response.data;
};

export const writeCommentApi = async ({
  postId,
  ...body
}: WriteCommentRequest) => {
  const response = await apiClient.post<CommentType>(
    COMMENT_URL.DEFAULT(postId),
    body,
  );

  return response.data;
};

export const changeCommentLikeStatusApi = async ({
  commentId,
  type,
}: ChangeCommentLikeStatusRequest) => {
  const response = await apiClient.post<ChangeCommentLikeStatusResponse>(
    COMMENT_URL.LIKE_STATUS(commentId),
    {
      type,
    },
  );

  return response.data;
};

export const deleteCommentApi = async ({ commentId }: DeleteCommentRequest) => {
  const response = await apiClient.delete<DeleteCommentResponse>(
    COMMENT_URL.DELETE(commentId),
  );

  return response.data;
};
