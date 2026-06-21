import { apiClient } from "../api-client";
import { BOOK_URL } from "../endpoint";
import type { GetSearchBookRequest, GetSearchBookResponse } from "./book.types";

export const getSearchBookApi = async (params: GetSearchBookRequest) => {
  const response = await apiClient.get<GetSearchBookResponse>(
    BOOK_URL.DEFAULT,
    {
      params,
    },
  );

  return response.data;
};
