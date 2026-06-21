import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import { getBookDetailApi, getSearchBookApi } from "./book.api";
import { BOOK_QUERY_KEY } from "./book.query-key";
import {
  GetBookDetailResponse,
  type GetSearchBookResponse,
} from "./book.types";

type BookSearchPage = number;

export const useSearchBookQuery = (
  keyword: string,
  page: number,
  isFinalized: boolean,
) => {
  const normalizedKeyword = keyword.trim();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isPending: isPendingSearchBook,
    isFetching: isFetchingSearchBook,
    isFetchingNextPage,
    isError: isErrorSearchBook,
    error: searchBookError,
  } = useInfiniteQuery<
    GetSearchBookResponse,
    Error,
    InfiniteData<GetSearchBookResponse, BookSearchPage>,
    ReturnType<typeof BOOK_QUERY_KEY.SEARCH>,
    BookSearchPage
  >({
    queryKey: BOOK_QUERY_KEY.SEARCH(normalizedKeyword, page, isFinalized),
    queryFn: ({ pageParam }) => {
      const shouldFinalizeSearch = isFinalized && pageParam === page;

      return getSearchBookApi({
        keyword: normalizedKeyword,
        page: pageParam,
        isFinalized: shouldFinalizeSearch,
      });
    },
    initialPageParam: page,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.last ? undefined : page + allPages.length,
    enabled: normalizedKeyword.length > 0,
  });

  useEffect(() => {
    if (isErrorSearchBook && searchBookError) {
      Toast.show({
        type: "error",
        text1: searchBookError.message,
      });
    }
  }, [isErrorSearchBook, searchBookError]);

  const searchPages = data?.pages ?? [];
  const firstPage = searchPages[0];

  return {
    searchBookList: searchPages.flatMap(
      (searchPage) => searchPage.searchResult,
    ),
    totalElements: firstPage?.totalElements ?? 0,
    fetchNextPage,
    hasNextPage,
    isPendingSearchBook,
    isFetchingSearchBook,
    isFetchingNextPage,
  };
};

export const useBookDetailQuery = (isbn: string) => {
  const {
    data: bookDetailData,
    isPending: isPendingBookDetail,
    isError,
    error,
    refetch: refetchBookDetail,
    isRefetching: isRefetchingBookDetail,
  } = useQuery<GetBookDetailResponse, Error>({
    queryKey: BOOK_QUERY_KEY.DETAIL(isbn),
    queryFn: () => getBookDetailApi(isbn),
    enabled: !!isbn,
  });

  useEffect(() => {
    if (isError && error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  }, [isError, error]);

  return {
    bookDetailData,
    isPendingBookDetail,
    refetchBookDetail,
    isRefetchingBookDetail,
  };
};
