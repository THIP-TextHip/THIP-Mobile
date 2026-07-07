import type { InfiniteData } from "@tanstack/react-query";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import { FEED_QUERY_KEY } from "../feed";
import { getCommentListApi, writeCommentApi } from "./comment.api";
import { COMMENT_QUERY_KEY } from "./comment.query-key";
import type {
  CommentPostType,
  CommentType,
  GetCommentListResponse,
  WriteCommentRequest,
} from "./comment.types";

type CommentCursor = string | null;

const COMMENT_QUERY_CACHE_TIME = {
  STALE: 1000 * 60,
  GC: 1000 * 60 * 5,
} as const;

const hasPostId = (postId?: number | string): postId is number | string =>
  postId != null && postId !== "";

export const useGetCommentListQuery = (
  postId: number | string,
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

export const useWriteCommentMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: writeComment, isPending: isPendingWriteComment } =
    useMutation<CommentType, Error, WriteCommentRequest>({
      mutationFn: writeCommentApi,
      onSuccess: (_, { postId, postType }) => {
        queryClient.invalidateQueries({
          queryKey: COMMENT_QUERY_KEY.LIST(postId, postType),
        });
        // TODO: 추후 RECORD와 VOTE도 추가 예정
        if (postType === "FEED") {
          queryClient.invalidateQueries({
            queryKey: FEED_QUERY_KEY.ALL,
          });
        }
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error.message}`,
        });
      },
    });

  return { writeComment, isPendingWriteComment };
};
