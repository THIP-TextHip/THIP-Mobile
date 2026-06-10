import { apiClient } from "../api-client";
import { COMMENT_URL } from "../endpoint";
import type {
  GetCommentListRequest,
  GetCommentListResponse,
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
