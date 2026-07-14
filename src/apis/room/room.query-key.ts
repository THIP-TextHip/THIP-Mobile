import type { RoomCategory, SearchRoomQueryParams } from "./room.types";

export const ROOM_QUERY_KEY = {
  DEFAULT: ["rooms"],
  MAIN: (category: RoomCategory) => ["rooms", category],
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
} as const;
