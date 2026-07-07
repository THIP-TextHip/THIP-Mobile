import type { CommentPostType } from "./comment.types";

export const COMMENT_QUERY_KEY = {
  LIST: (postId: number | string, postType: CommentPostType) => [
    "comments",
    postType,
    String(postId),
  ],
} as const;
