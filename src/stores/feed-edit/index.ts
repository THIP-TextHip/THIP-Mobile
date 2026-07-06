import { create } from "zustand";

import { type BottomSheetBookItemType } from "@shared/ui";

interface PrevFeed {
  feedId: number;
  feedBook: BottomSheetBookItemType;
  contentBody: string;
  isPublic: boolean;
  imageUrls: string[];
  selectedTagList: string[];
}

interface PrevFeedStore {
  prevFeed: PrevFeed | null;
  setPrevFeed: (prevFeed: PrevFeed) => void;
  clearPrevFeed: () => void;
}

export const usePrevFeedStore = create<PrevFeedStore>((set) => ({
  prevFeed: null,
  setPrevFeed: (prevFeed) => set({ prevFeed }),
  clearPrevFeed: () => set({ prevFeed: null }),
}));
