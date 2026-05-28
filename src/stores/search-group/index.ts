// TODO: 추후 api 관련 타입으로 분리하기
import { SearchGroupCategoryType } from "@/screens/search-group/types";
import { create } from "zustand";

interface SearchGroupInitialCategoryStore {
  searchGroupInitialCategory: SearchGroupCategoryType | null;
  setSearchGroupInitialCategory: (category: SearchGroupCategoryType) => void;
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
