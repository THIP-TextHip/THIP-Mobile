import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppText, GenreCardGroup, InputNickname } from "@shared/ui";
import { colors } from "@theme/token";

import { EditProfileHeader } from "./components";
import {
  DUMMY_GENRE,
  DUMMY_NICKNAME,
  EDIT_PROFILE_NICKNAME_ERROR,
} from "./constants";

export default function EditProfileScreen() {
  const [inputNickname, setInputNickname] = useState(DUMMY_NICKNAME);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(
    DUMMY_GENRE
  );

  const handleUpdateProfile = () => {
    // TODO: 서버 api 연동
    console.log(inputNickname, selectedGenre, "로 프로필 업데이트 요청");
  };

  // TODO: 변경사항이 있을 경우
  const isChanged =
    inputNickname !== DUMMY_NICKNAME || selectedGenre !== DUMMY_GENRE;
  const ableToChange =
    isChanged && inputNickname.length > 1 && selectedGenre !== null;

  return (
    <View>
      <EditProfileHeader
        disabled={!ableToChange}
        handleUpdateProfile={handleUpdateProfile}
      />
      <View style={styles.container}>
        <View style={styles.nicknameSection}>
          <AppText weight="semibold" size="lg" color={colors.white}>
            닉네임 변경
          </AppText>
          <InputNickname
            value={inputNickname}
            isError={false}
            errorMessage={EDIT_PROFILE_NICKNAME_ERROR.INTERVAL_LIMIT}
            setValue={setInputNickname}
          />
        </View>
        <View style={styles.genreSection}>
          <View style={styles.genreText}>
            <AppText weight="semibold" size="lg" color={colors.white}>
              칭호 편집
            </AppText>
            <AppText weight="regular" size="sm" color={colors.grey[100]}>
              장르는 칭호와 연결돼요.
            </AppText>
          </View>
          <GenreCardGroup
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 40,
  },
  nicknameSection: {
    gap: 12,
  },
  genreSection: {
    gap: 20,
  },
  genreText: {
    gap: 8,
  },
});
