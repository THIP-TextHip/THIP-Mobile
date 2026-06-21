import { apiClient } from "../api-client";
import { BOOK_URL } from "../endpoint";
import type {
  GetBookDetailResponse,
  GetSearchBookRequest,
  GetSearchBookResponse,
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
