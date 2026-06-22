import type { InfiniteData } from "@tanstack/react-query";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import {
  changeBookSaveStatusApi,
  getBookDetailApi,
  getMostSearchedBookApi,
  getSavedBookApi,
  getSearchBookApi,
} from "./book.api";
import { BOOK_QUERY_KEY } from "./book.query-key";
import {
  ChangeBookSaveStatusRequest,
  ChangeBookSaveStatusResponse,
  GetBookDetailResponse,
  GetMostSearchedBookResponse,
  GetSavedBookResponse,
  type GetSearchBookResponse,
} from "./book.types";

const MOST_SEARCHED_BOOK_QUERY_CACHE_TIME = {
  STALE: 1000 * 60 * 10,
  GC: 1000 * 60 * 15,
};

type BookSearchPage = number;
type SavedBookCursor = string | null;

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

export const useMostSearchedBookQuery = () => {
  const {
    data: mostSearchedBookData,
    isPending: isPendingMostSearchedBook,
    isError: isErrorMostSearchedBook,
  } = useQuery<GetMostSearchedBookResponse, Error>({
    queryKey: BOOK_QUERY_KEY.MOST,
    queryFn: getMostSearchedBookApi,
    staleTime: MOST_SEARCHED_BOOK_QUERY_CACHE_TIME.STALE,
    gcTime: MOST_SEARCHED_BOOK_QUERY_CACHE_TIME.GC,
  });

  return {
    mostSearchedBookData,
    isPendingMostSearchedBook,
    isErrorMostSearchedBook,
  };
};

export const useChangeBookSaveStatusMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: changeBookSaveStatus } = useMutation<
    ChangeBookSaveStatusResponse,
    Error,
    ChangeBookSaveStatusRequest
  >({
    mutationFn: changeBookSaveStatusApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BOOK_QUERY_KEY.ALL,
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `${error.message}`,
      });
    },
  });

  return { changeBookSaveStatus };
};

export const useSavedBookQuery = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingSavedBook,
    isError: isErrorSavedBook,
    error: savedBookError,
    refetch: refetchSavedBook,
    isRefetching: isRefetchingSavedBook,
  } = useInfiniteQuery<
    GetSavedBookResponse,
    Error,
    InfiniteData<GetSavedBookResponse, SavedBookCursor>,
    typeof BOOK_QUERY_KEY.SAVED,
    SavedBookCursor
  >({
    queryKey: BOOK_QUERY_KEY.SAVED,
    queryFn: ({ pageParam }) => getSavedBookApi(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
  });

  useEffect(() => {
    if (isErrorSavedBook && savedBookError) {
      Toast.show({
        type: "error",
        text1: savedBookError.message,
      });
    }
  }, [isErrorSavedBook, savedBookError]);

  return {
    savedBookList: data?.pages.flatMap((page) => page.bookList) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingSavedBook,
    refetchSavedBook,
    isRefetchingSavedBook,
  };
};
