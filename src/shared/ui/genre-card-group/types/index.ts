import { ComponentType } from "react";

export type GenreId =
  | "literature"
  | "science"
  | "socialScience"
  | "art"
  | "humanity";

export interface GenreItem {
  id: GenreId;
  title: string;
  subTitle: string;
  color: string;
  image: ComponentType<{ width: number; height: number }>;
}
