import { apiClient } from "../api-client";
import { BOOK_URL } from "../endpoint";
import {
  GetSavedBookResponse,
  type ChangeBookSaveStatusRequest,
  type ChangeBookSaveStatusResponse,
  type GetBookDetailResponse,
  type GetMostSearchedBookResponse,
  type GetSearchBookRequest,
  type GetSearchBookResponse,
} from "./book.types";

export const getSearchBookApi = async (params: GetSearchBookRequest) => {
  const response = await apiClient.get<GetSearchBookResponse>(
    BOOK_URL.DEFAULT,
    {
      params,
    },
  );

  return response.data;
};

export const getBookDetailApi = async (isbn: string) => {
  const response = await apiClient.get<GetBookDetailResponse>(
    BOOK_URL.DETAIL(isbn),
  );

  return response.data;
};

export const getMostSearchedBookApi = async () => {
  const response = await apiClient.get<GetMostSearchedBookResponse>(
    BOOK_URL.MOST,
  );

  return response.data;
};

export const changeBookSaveStatusApi = async ({
  isbn,
  type,
}: ChangeBookSaveStatusRequest) => {
  const response = await apiClient.post<ChangeBookSaveStatusResponse>(
    BOOK_URL.SAVE_STATUS(isbn),
    {
      type,
    },
  );

  return response.data;
};

export const getSavedBookApi = async (cursor?: string | null) => {
  const response = await apiClient.get<GetSavedBookResponse>(BOOK_URL.SAVED, {
    params: cursor == null ? undefined : { cursor },
  });

  return response.data;
};
