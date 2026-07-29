import { create } from "zustand";

import { type NotificationRouteParamMap } from "@apis/notification";
import { type RoomDetailCurrentVotes } from "@apis/room";
import {
  type GetBookInfoForPinResponse,
  type RoomPostVote,
} from "@apis/room-post";

interface PrevRecord {
  postId: number;
  page: number;
  isOverview: boolean;
  content: string;
  voteItems: RoomPostVote[];
}

interface PrevRecordStore {
  prevRecord: PrevRecord | null;
  setPrevRecord: (prevRecord: PrevRecord) => void;
  clearPrevRecord: () => void;
}

export const usePrevRecordStore = create<PrevRecordStore>((set) => ({
  prevRecord: null,
  setPrevRecord: (prevRecord) => set({ prevRecord }),
  clearPrevRecord: () => set({ prevRecord: null }),
}));

interface RecordBookPinInfo {
  bookInfo: GetBookInfoForPinResponse;
  content: string;
}

interface RecordBookPinStore {
  pinInfo: RecordBookPinInfo | null;
  setPinInfo: (pinInfo: RecordBookPinInfo) => void;
  clearPinInfo: () => void;
}

export const useRecordBookPinStore = create<RecordBookPinStore>((set) => ({
  pinInfo: null,
  setPinInfo: (pinInfo) => set({ pinInfo }),
  clearPinInfo: () => set({ pinInfo: null }),
}));

interface RecordBookAlarmStore {
  recordBookAlarmInfo: NotificationRouteParamMap["ROOM_POST_DETAIL"] | null;
  setRecordBookAlarmInfo: (
    recordBookAlarmInfo: NotificationRouteParamMap["ROOM_POST_DETAIL"],
  ) => void;
  clearRecordBookAlarmInfo: () => void;
}

export const useRecordBookAlarmStore = create<RecordBookAlarmStore>((set) => ({
  recordBookAlarmInfo: null,
  setRecordBookAlarmInfo: (recordBookAlarmInfo) => set({ recordBookAlarmInfo }),
  clearRecordBookAlarmInfo: () => set({ recordBookAlarmInfo: null }),
}));

interface RoomDetailVoteStore {
  roomDetailVote: RoomDetailCurrentVotes | null;
  setRoomDetailVote: (roomDetailVote: RoomDetailCurrentVotes) => void;
  clearRoomDetailVote: () => void;
}

export const useRoomDetailVoteStore = create<RoomDetailVoteStore>((set) => ({
  roomDetailVote: null,
  setRoomDetailVote: (roomDetailVote) => set({ roomDetailVote }),
  clearRoomDetailVote: () => set({ roomDetailVote: null }),
}));
