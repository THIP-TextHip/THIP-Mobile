import { SignUpGenreScreen } from "@screens/sign-up/genre";
import { useNicknameGenreContext } from "@screens/sign-up/hooks";

export default function GenrePage() {
  const { genre, setGenre } = useNicknameGenreContext();
  return (
    <SignUpGenreScreen selectedGenre={genre} setSelectedGenre={setGenre} />
  );
}
