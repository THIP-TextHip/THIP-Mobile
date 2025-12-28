import { createContext, useContext } from "react";

interface NicknameGenreContextType {
  nickname: string;
  isNicknameDuplicated: boolean;
  genre: string | null;
  setNickname: (v: string) => void;
  setGenre: (v: string | null) => void;
}

export const NicknameGenreContext =
  createContext<NicknameGenreContextType | null>(null);

export const useNicknameGenreContext = () => {
  const ctx = useContext(NicknameGenreContext);
  if (!ctx)
    throw new Error(
      "useNicknameGenreContext must be used within NicknameGenreContext"
    );
  return ctx;
};
