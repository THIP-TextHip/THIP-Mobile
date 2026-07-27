import { create } from "zustand";

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
