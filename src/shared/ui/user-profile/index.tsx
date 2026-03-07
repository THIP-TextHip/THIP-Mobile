import { StyleSheet, View } from "react-native";

import { colors } from "@theme/token";

import AppText from "../app-text";
import { ButtonOutline } from "../button";
import { GENRES } from "../genre-card-group/constants";

// TODO : 유저정보 관련 type은 추후에 따로 생성하여 관리
interface UserProfileType {
  nickname: string;
  genre: string;
  profileColor: string;
}

type UserProfileProps = (
  | { type?: "default" }
  | {
      type: "edit-profile";
      handleToEdit: () => void;
    }
  | {
      type: "thip";
      isThipped: boolean;
      handlePressThip: () => void;
    }
) & { userProfile: UserProfileType };

export default function UserProfile(props: UserProfileProps) {
  const nickname = props.userProfile.nickname;
  const genre = props.userProfile.genre;
  const profileColor = props.userProfile.profileColor;

  const GenreImage = GENRES.find((item) => item.subTitle === genre)?.image;

  let buttonText: string | null = null;
  let handlePressButton: (() => void) | undefined;

  switch (props.type) {
    case "edit-profile":
      buttonText = "편집";
      handlePressButton = props.handleToEdit;
      break;

    case "thip":
      buttonText = props.isThipped ? "띱 취소" : "띱 하기";
      handlePressButton = props.handlePressThip;
      break;

    default:
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileWrapper}>
        <View style={styles.image}>
          {GenreImage && <GenreImage width={43} height={43} />}
        </View>
        <View style={styles.textWrapper}>
          <AppText weight="semibold" size="lg" color={colors.white}>
            {nickname}
          </AppText>
          <AppText weight="regular" size="sm" color={profileColor}>
            {genre}
          </AppText>
        </View>
      </View>
      {buttonText && (
        <ButtonOutline handlePress={handlePressButton}>
          {buttonText}
        </ButtonOutline>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  image: {
    width: 54,
    height: 54,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: colors.grey[200],
    overflow: "hidden",
  },
  textWrapper: {
    gap: 4,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.grey[300],
  },
});
