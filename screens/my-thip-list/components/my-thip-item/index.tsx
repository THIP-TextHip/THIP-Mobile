import { Pressable, StyleSheet, View } from "react-native";

import { AppText, ProfileImage } from "@shared/ui";
import { ButtonOutline } from "@shared/ui/button";
import { colors } from "@theme/token";
import { router } from "expo-router";

interface MyThipItemProps {
  userId: number;
  profileImage: string;
  nickname: string;
  aliasName: string;
  aliasColor: string;
}

export default function MyThipItem({
  userId,
  profileImage,
  nickname,
  aliasName,
  aliasColor,
}: MyThipItemProps) {
  const handleToUserProfile = () => {
    router.push({
      pathname: "/user-profile/[userId]",
      params: { userId: String(userId) },
    });
  };

  // TODO: 서버에 띱 취소 요청
  const handleCancelThip = () => {
    console.log(nickname, "에 대하여 띱 취소");
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
      <ButtonOutline handlePress={handleCancelThip}>띱 취소</ButtonOutline>
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
