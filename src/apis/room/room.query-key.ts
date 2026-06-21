import type { SearchRoomQueryParams } from "./room.types";

export const ROOM_QUERY_KEY = {
  SEARCH: ({
    keyword = "",
    category = "",
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
