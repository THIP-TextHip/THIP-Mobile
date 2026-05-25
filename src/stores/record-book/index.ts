import { create } from "zustand";

import type { RecordBookVoteItemType } from "@screens/record-book/types";

export interface PrevRecord {
  postId: number;
  page: number;
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
