import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";

import { getCommentListApi } from "./comment.api";
import { COMMENT_QUERY_KEY } from "./comment.query-key";
import type {
  CommentPostType,
  GetCommentListResponse,
} from "./comment.types";

type CommentCursor = string | null;

const COMMENT_QUERY_CACHE_TIME = {
  STALE: 1000 * 60,
  GC: 1000 * 60 * 5,
} as const;

const hasPostId = (postId?: number | string): postId is number | string =>
  postId != null && postId !== "";

export const useGetCommentListQuery = (
  postId: number | string | undefined,
  postType: CommentPostType,
) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingCommentList,
    isError: isErrorCommentList,
    error: commentListError,
    refetch: refetchCommentList,
    isRefetching: isRefetchingCommentList,
  } = useInfiniteQuery<
    GetCommentListResponse,
    Error,
    InfiniteData<GetCommentListResponse, CommentCursor>,
    ReturnType<typeof COMMENT_QUERY_KEY.LIST>,
    CommentCursor
  >({
    queryKey: COMMENT_QUERY_KEY.LIST(postId, postType),
    queryFn: ({ pageParam }) => {
      if (!hasPostId(postId)) {
        throw new Error("postId is required.");
      }

      return getCommentListApi({
        postId,
        postType,
        cursor: pageParam,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
    enabled: hasPostId(postId),
    staleTime: COMMENT_QUERY_CACHE_TIME.STALE,
    gcTime: COMMENT_QUERY_CACHE_TIME.GC,
  });

  return {
    commentList: data?.pages.flatMap((page) => page.commentList) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingCommentList,
    isErrorCommentList,
    commentListError,
    refetchCommentList,
    isRefetchingCommentList,
  };
};
