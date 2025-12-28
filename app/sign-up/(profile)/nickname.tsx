import { useNicknameGenreContext } from "@screens/sign-up/hooks";
import { SignUpNicknameScreen } from "@screens/sign-up/nickname";

export default function NicknamePage() {
  const { nickname, isNicknameDuplicated, setNickname } =
    useNicknameGenreContext();
  return (
    <SignUpNicknameScreen
      nickname={nickname}
      isNicknameDuplicated={isNicknameDuplicated}
      setNickname={setNickname}
    />
  );
}
