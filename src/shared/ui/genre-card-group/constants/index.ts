import {
  GenreArt,
  GenreHumanity,
  GenreLiterature,
  GenreScience,
  GenreSocialScience,
} from "@images/thip/genre";
import { colors } from "@theme/token";

import { GenreItem } from "../types";

export const GENRE_IMAGE_SIZE = { width: 80, height: 70 } as const;

export const GENRES: GenreItem[] = [
  {
    id: "literature",
    title: "문학",
    subTitle: "문학가",
    image: GenreLiterature,
    color: colors.character.mint,
  },
  {
    id: "science",
    title: "과학·IT",
    subTitle: "과학자",
    image: GenreScience,
    color: colors.character.lavender,
  },
  {
    id: "socialScience",
    title: "사회과학",
    subTitle: "사회학자",
    image: GenreSocialScience,
    color: colors.character.orange,
  },
  {
    id: "art",
    title: "예술",
    subTitle: "예술가",
    image: GenreArt,
    color: colors.character.pink,
  },
  {
    id: "humanity",
    title: "인문학",
    subTitle: "철학자",
    image: GenreHumanity,
    color: colors.character.skyblue,
  },
] as const;
