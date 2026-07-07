import { apiClient } from "../api-client";
import { COMMENT_URL } from "../endpoint";
import type {
  CommentType,
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
