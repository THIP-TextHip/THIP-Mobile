import { create } from "zustand";

import { SearchRoomCategory } from "@apis/room";

interface SearchGroupInitialCategoryStore {
  searchGroupInitialCategory: SearchRoomCategory | null;
  setSearchGroupInitialCategory: (category: SearchRoomCategory) => void;
  clearSearchGroupInitialCategory: () => void;
}

export const useSearchGroupInitialCategory =
  create<SearchGroupInitialCategoryStore>((set) => ({
    searchGroupInitialCategory: null,
    setSearchGroupInitialCategory: (category) =>
      set({ searchGroupInitialCategory: category }),
    clearSearchGroupInitialCategory: () =>
      set({ searchGroupInitialCategory: null }),
  }));
