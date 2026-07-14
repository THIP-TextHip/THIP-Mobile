import { apiClient } from "../api-client";
import { ROOM_URL } from "../endpoint";
import type {
  GetRoomListRequest,
  GetRoomListResponse,
  GetSearchRoomRequest,
  GetSearchRoomResponse,
} from "./room.types";

export const getSearchRoomApi = async (params: GetSearchRoomRequest) => {
  const response = await apiClient.get<GetSearchRoomResponse>(ROOM_URL.SEARCH, {
    params,
  });

  return response.data;
};

export const getRoomListApi = async ({ category }: GetRoomListRequest) => {
  const response = await apiClient.get<GetRoomListResponse>(ROOM_URL.DEFAULT, {
    params: { category },
  });

  return response.data;
};
