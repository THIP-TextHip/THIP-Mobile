import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText, ButtonOutline, ProfileImage } from "@shared/ui";
import { colors } from "@theme/token";

interface MyThipItemProps {
  userId: number;
  profileImage: string;
  nickname: string;
  aliasName: string;
  aliasColor: string;
  isFollowing: boolean;
  handleChangeFollowingState: () => void;
}

export default function MyThipItem({
  userId,
  profileImage,
  nickname,
  aliasName,
  aliasColor,
  isFollowing,
  handleChangeFollowingState,
}: MyThipItemProps) {
  const handleToUserProfile = () => {
    router.push({
      pathname: "/user-profile/[userId]",
      params: { userId: String(userId) },
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.profile} onPress={handleToUserProfile}>
        <ProfileImage image={profileImage} />
        <View style={styles.textWrapper}>
          <AppText weight="medium" size="sm" color={colors.white}>
            {nickname}
          </AppText>
          <AppText weight="regular" size="xs" color={aliasColor}>
            {aliasName}
          </AppText>
        </View>
      </Pressable>
      <ButtonOutline handlePress={handleChangeFollowingState}>
        {isFollowing ? "띱 취소" : "띱 하기"}
      </ButtonOutline>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profile: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  textWrapper: {
    gap: 4,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grey[300],
  },
});
