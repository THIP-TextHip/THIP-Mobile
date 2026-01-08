import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { GENRES } from "@shared/ui/genre-card-group/constants";
import { colors } from "@theme/token";

// TODO: 프로필 정보 서버에서 받아오기
const nickname = "ThipUser01";
const genre = "문학가";
const profileColor = colors.character.mint;

export default function ProfileSection() {
  const GenreImage = GENRES.find((item) => item.subTitle === genre)?.image;

  const handleToEditProfile = () => {
    router.push("/edit-profile");
  };

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
      <Pressable style={styles.editButton} onPress={handleToEditProfile}>
        <AppText weight="medium" size="sm" color={colors.grey[200]}>
          편집
        </AppText>
      </Pressable>
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
