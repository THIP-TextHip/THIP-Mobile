import type {
  MyRoomType,
  RoomCategory,
  SearchRoomQueryParams,
} from "./room.types";

export const ROOM_QUERY_KEY = {
  ALL: ["rooms"],
  HOME_RECRUITING: (category: RoomCategory) => ["rooms", "home", category],
  SEARCH: ({
    keyword = "",
    category,
    isAllCategory = false,
    sort,
    isFinalized,
  }: SearchRoomQueryParams) => [
    "rooms",
    "search",
    keyword,
    category,
    isAllCategory,
    sort,
    isFinalized,
  ],
  MY_ROOM: (type: MyRoomType) => ["rooms", "my-room", type],
  HOME_MY_ROOM: ["rooms", "home", "my-room"],
} as const;
