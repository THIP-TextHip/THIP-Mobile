import { create } from "zustand";

interface SelectedBookInfo {
  bookTitle: string;
  authorName: string;
  bookImageUrl: string;
  isbn: string;
}

interface SelectedBookStore {
  selectedBookInfo: SelectedBookInfo | null;
  setSelectedBookInfo: (selectedBookInfo: SelectedBookInfo) => void;
  clearSelectedBookInfo: () => void;
}

export const useSelectedBookStore = create<SelectedBookStore>((set) => ({
  selectedBookInfo: null,
  setSelectedBookInfo: (selectedBookInfo) => set({ selectedBookInfo }),
  clearSelectedBookInfo: () => set({ selectedBookInfo: null }),
}));
