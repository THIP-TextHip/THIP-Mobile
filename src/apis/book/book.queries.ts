import type { InfiniteData } from "@tanstack/react-query";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import { router } from "expo-router";
import {
  changeBookSaveStatusApi,
  getBookDetailApi,
  getBookRecruitingRoomsApi,
  getBookSelectableListApi,
  getMostSearchedBookApi,
  getSavedBookApi,
  getSearchBookApi,
} from "./book.api";
import { BOOK_QUERY_KEY } from "./book.query-key";
import type {
  BookSelectableListType,
  ChangeBookSaveStatusRequest,
  ChangeBookSaveStatusResponse,
  GetBookDetailResponse,
  GetBookRecruitingRoomsResponse,
  GetBookSelectableListResponse,
  GetMostSearchedBookResponse,
  GetSavedBookResponse,
  GetSearchBookResponse,
} from "./book.types";

const BOOK_QUERY_CACHE_TIME = {
  STALE: 1000 * 60 * 2,
  GC: 1000 * 60 * 10,
} as const;

const MOST_SEARCHED_BOOK_QUERY_CACHE_TIME = {
  STALE: 1000 * 60 * 10,
  GC: 1000 * 60 * 15,
};

type BookSearchPage = number;
type SavedBookCursor = string | null;
type BookRecruitingRoomCursor = string | null;
type BookSelectableListCursor = string | null;

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
    isFetchingNextPage,
    isErrorSearchBook,
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
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/feed");
      }
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
  const {
    mutate: changeBookSaveStatus,
    isPending: isPendingChangeBookSaveStatus,
  } = useMutation<
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

  return { changeBookSaveStatus, isPendingChangeBookSaveStatus };
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
    staleTime: BOOK_QUERY_CACHE_TIME.STALE,
    gcTime: BOOK_QUERY_CACHE_TIME.GC,
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
    isErrorSavedBook,
    refetchSavedBook,
    isRefetchingSavedBook,
  };
};

export const useBookRecruitingRoomsQuery = (isbn: string) => {
  const normalizedIsbn = isbn.trim() ?? "";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingBookRecruitingRooms,
    isError: isErrorBookRecruitingRooms,
    error: bookRecruitingRoomsError,
    refetch: refetchBookRecruitingRooms,
    isRefetching: isRefetchingBookRecruitingRooms,
  } = useInfiniteQuery<
    GetBookRecruitingRoomsResponse,
    Error,
    InfiniteData<GetBookRecruitingRoomsResponse, BookRecruitingRoomCursor>,
    ReturnType<typeof BOOK_QUERY_KEY.RECRUITING>,
    BookRecruitingRoomCursor
  >({
    queryKey: BOOK_QUERY_KEY.RECRUITING(normalizedIsbn),
    queryFn: ({ pageParam }) =>
      getBookRecruitingRoomsApi(normalizedIsbn, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
    enabled: normalizedIsbn.length > 0,
  });

  useEffect(() => {
    if (isErrorBookRecruitingRooms && bookRecruitingRoomsError) {
      Toast.show({
        type: "error",
        text1: bookRecruitingRoomsError.message,
      });
    }
  }, [isErrorBookRecruitingRooms, bookRecruitingRoomsError]);

  const recruitingRoomPages = data?.pages ?? [];
  const firstPage = recruitingRoomPages[0];

  return {
    recruitingRoomList: recruitingRoomPages.flatMap(
      (page) => page.recruitingRoomList,
    ),
    totalRoomCount: firstPage?.totalRoomCount ?? 0,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingBookRecruitingRooms,
    isErrorBookRecruitingRooms,
    refetchBookRecruitingRooms,
    isRefetchingBookRecruitingRooms,
  };
};

export const useBookSelectableListQuery = (type: BookSelectableListType) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingBookSelectableList,
    isError: isErrorBookSelectableList,
  } = useInfiniteQuery<
    GetBookSelectableListResponse,
    Error,
    InfiniteData<GetBookSelectableListResponse, BookSelectableListCursor>,
    ReturnType<typeof BOOK_QUERY_KEY.SELECTABLE_LIST>,
    BookSelectableListCursor
  >({
    queryKey: BOOK_QUERY_KEY.SELECTABLE_LIST(type),
    queryFn: ({ pageParam }) => getBookSelectableListApi(type, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
    staleTime: BOOK_QUERY_CACHE_TIME.STALE,
    gcTime: BOOK_QUERY_CACHE_TIME.GC,
  });

  return {
    bookSelectableList: data?.pages.flatMap((page) => page.bookList) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingBookSelectableList,
    isErrorBookSelectableList,
  };
};
