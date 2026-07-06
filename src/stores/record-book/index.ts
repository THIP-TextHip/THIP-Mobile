import { create } from "zustand";

import { type RecordBookVoteItemType } from "@screens/record-book";

interface PrevRecord {
  postId: number;
  page: number;
  isOverview: boolean;
  content: string;
  voteItems: RecordBookVoteItemType[];
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
  bookInfo: {
    bookTitle: string;
    authorName: string;
    bookImageUrl: string;
    isbn: string;
  };
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
