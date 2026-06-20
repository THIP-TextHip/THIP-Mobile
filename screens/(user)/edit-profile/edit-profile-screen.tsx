import { useCallback, useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";

import { useEditUserProfileMutation, useGetUserInfoQuery } from "@apis/user";
import { AppText, GenreCardGroup, InputNickname } from "@shared/ui";
import { colors } from "@theme/token";

import { EditProfileHeader } from "./components";
import { EDIT_PROFILE_NICKNAME_ERROR } from "./constants";

export default function EditProfileScreen() {
  const { userInfo } = useGetUserInfoQuery();
  const { editUserProfile, isPendingEditUserProfile } =
    useEditUserProfileMutation();
  const [inputNickname, setInputNickname] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleUpdateProfile = () => {
    if (!userInfo || selectedGenre === null) return;

    const body = {
      ...(inputNickname !== userInfo.nickname && { nickname: inputNickname }),
      ...{ aliasName: selectedGenre },
    };

    if (Object.keys(body).length === 0) return;

    editUserProfile(body);
  };

  const handleDismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    if (!userInfo) return;

    setInputNickname(userInfo.nickname);
    setSelectedGenre(userInfo.aliasName);
  }, [userInfo]);

  const isChanged =
    !!userInfo &&
    (inputNickname !== userInfo.nickname ||
      selectedGenre !== userInfo.aliasName);
  const ableToChange =
    isChanged &&
    inputNickname.length > 1 &&
    selectedGenre !== null &&
    !isPendingEditUserProfile;

  return (
    <Pressable onPress={handleDismissKeyboard}>
      <EditProfileHeader
        disabled={!ableToChange}
        handleUpdateProfile={handleUpdateProfile}
      />
      <View style={styles.container}>
        <Pressable
          style={styles.nicknameSection}
          onPress={(e) => e.stopPropagation()}
        >
          <AppText weight="semibold" size="lg" color={colors.white}>
            닉네임 변경
          </AppText>
          <InputNickname
            value={inputNickname}
            isError={false}
            errorMessage={EDIT_PROFILE_NICKNAME_ERROR.INTERVAL_LIMIT}
            setValue={setInputNickname}
          />
        </Pressable>
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
    </Pressable>
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
