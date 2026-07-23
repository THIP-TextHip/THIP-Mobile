import { apiClient } from "../api-client";
import { ROOM_URL } from "../endpoint";
import type {
  ChangeRoomJoinStatusRequest,
  ChangeRoomJoinStatusResponse,
  CloseRoomRecruitingRequest,
  CloseRoomRecruitingResponse,
  CreateRoomRequest,
  CreateRoomResponse,
  GetHomeMyRoomResponse,
  GetHomeRecruitingRoomRequest,
  GetHomeRecruitingRoomResponse,
  GetMyRoomListRequest,
  GetMyRoomListResponse,
  GetReadingMateResponse,
  GetRecruitingRoomDetailResponse,
  GetRoomBookPageInfoResponse,
  GetRoomDetailRequest,
  GetRoomDetailResponse,
  GetSearchRoomRequest,
  GetSearchRoomResponse,
  LeaveRoomRequest,
  VerifyPrivateRoomPasswordRequest,
  VerifyPrivateRoomPasswordResponse,
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

export const getHomeMyRoomApi = async (cursor?: string | null) => {
  const response = await apiClient.get<GetHomeMyRoomResponse>(
    ROOM_URL.HOME_MY_ROOM,
    {
      params: cursor == null ? undefined : { cursor },
    },
  );

  return response.data;
};

export const createRoomApi = async (body: CreateRoomRequest) => {
  const response = await apiClient.post<CreateRoomResponse>(
    ROOM_URL.DEFAULT,
    body,
  );

  return response.data;
};

export const changeRoomJoinStatusApi = async ({
  roomId,
  type,
}: ChangeRoomJoinStatusRequest) => {
  const response = await apiClient.post<ChangeRoomJoinStatusResponse>(
    ROOM_URL.ROOM_JOIN_STATUS(roomId),
    {
      type,
    },
  );

  return response.data;
};

export const closeRoomRecruitingApi = async ({
  roomId,
}: CloseRoomRecruitingRequest) => {
  const response = await apiClient.post<CloseRoomRecruitingResponse>(
    ROOM_URL.CLOSE_ROOM_RECRUITING(roomId),
  );

  return response.data;
};

export const leaveRoomApi = async ({ roomId }: LeaveRoomRequest) => {
  const response = await apiClient.delete<string>(ROOM_URL.LEAVE_ROOM(roomId));

  return response.data;
};

export const verifyPrivateRoomPasswordApi = async ({
  roomId,
  password,
}: VerifyPrivateRoomPasswordRequest) => {
  const response = await apiClient.post<VerifyPrivateRoomPasswordResponse>(
    ROOM_URL.VERIFY_PASSWORD(roomId),
    {
      password,
    },
  );

  return response.data;
};

export const getRoomDetailApi = async ({ roomId }: GetRoomDetailRequest) => {
  const response = await apiClient.get<GetRoomDetailResponse>(
    ROOM_URL.DETAIL(roomId),
  );

  return response.data;
};

export const getReadingMateApi = async (roomId: string | number) => {
  const response = await apiClient.get<GetReadingMateResponse>(
    ROOM_URL.READING_MATE(roomId),
  );

  return response.data;
};

export const getRecruitingRoomDetailApi = async (roomId: string | number) => {
  const response = await apiClient.get<GetRecruitingRoomDetailResponse>(
    ROOM_URL.RECRUITING_DETAIL(roomId),
  );

  return response.data;
};

export const getRoomBookPageInfoApi = async (roomId: number | string) => {
  const response = await apiClient.get<GetRoomBookPageInfoResponse>(
    ROOM_URL.BOOK_PAGE(roomId),
  );

  return response.data;
};
