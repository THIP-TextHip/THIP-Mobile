import { apiClient } from "../api-client";
import { ROOM_URL } from "../endpoint";
import type { GetSearchRoomRequest, GetSearchRoomResponse } from "./room.types";

export const getSearchRoomApi = async (params: GetSearchRoomRequest) => {
  const response = await apiClient.get<GetSearchRoomResponse>(ROOM_URL.SEARCH, {
    params,
  });

  return response.data;
};
