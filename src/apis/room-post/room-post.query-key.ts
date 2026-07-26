export const ROOM_POST_QUERY_KEY = {
  ALL: (roomId?: number | string) => [
    "room-post",
    roomId == null || roomId === "" ? undefined : String(roomId),
  ],
  BOOK_PAGE: (roomId?: number | string) => [
    "room-post",
    "book-page",
    roomId == null || roomId === "" ? undefined : String(roomId),
  ],
  LIST: (
    type: "group" | "mine",
    isOverview?: boolean | null,
    isPageFilter?: boolean | null,
    sort?: "latest" | "like" | "comment" | null,
    roomId?: number | string,
    pageStart?: number | null,
    pageEnd?: number | null,
  ) => [
    "room-post",
    roomId == null || roomId === "" ? undefined : String(roomId),
    type,
    sort,
    isOverview,
    isPageFilter,
    pageStart,
    pageEnd,
  ],
};
