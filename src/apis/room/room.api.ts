import { apiClient } from "../api-client";
import { ROOM_URL } from "../endpoint";
import type {
  GetHomeRecruitingRoomRequest,
  GetHomeRecruitingRoomResponse,
  GetMyRoomListRequest,
  GetMyRoomListResponse,
  GetSearchRoomRequest,
  GetSearchRoomResponse,
} from "./room.types";

export const getSearchRoomApi = async (params: GetSearchRoomRequest) => {
  const response = await apiClient.get<GetSearchRoomResponse>(ROOM_URL.SEARCH, {
    params,
  });

  return response.data;
};

export const getHomeRecuitingRoomApi = async ({
  category,
}: GetHomeRecruitingRoomRequest) => {
  const response = await apiClient.get<GetHomeRecruitingRoomResponse>(
    ROOM_URL.DEFAULT,
    {
      params: { category },
    },
  );

  return response.data;
};

export const getMyRoomListApi = async ({
  type,
  cursor,
}: GetMyRoomListRequest) => {
  const response = await apiClient.get<GetMyRoomListResponse>(
    ROOM_URL.MY_ROOM,
    {
      params: cursor == null ? { type } : { type, cursor },
    },
  );

  return response.data;
};
