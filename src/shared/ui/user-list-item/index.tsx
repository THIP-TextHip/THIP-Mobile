import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { FollowerType } from "@apis/user";
import { IcRightRight } from "@images/icons";
import { colors } from "@theme/token";

import AppText from "../app-text";
import ProfileImage from "../profile-image";

interface UserListItemProps {
  userData: FollowerType;
}

export default function UserListItem({ userData }: UserListItemProps) {
  const handleToUserProfile = () => {
    if (userData.isMyself) {
      router.push({
        pathname: "/feed",
        params: {
          tab: "my-feed",
        },
      });
    } else {
      router.push({
        pathname: "/user-profile/[userId]",
        params: { userId: String(userData.userId) },
      });
    }
  };
  return (
    <Pressable style={styles.container} onPress={handleToUserProfile}>
      <View style={styles.profile}>
        <ProfileImage image={userData.profileImageUrl} />
        <View style={styles.profileText}>
          <AppText weight="semibold" size="sm" color={colors.white}>
            {userData.nickname}
          </AppText>
          <AppText weight="regular" size="xs" color={userData.aliasColor}>
            {userData.aliasName}
          </AppText>
        </View>
      </View>
      <View style={styles.thipCount}>
        <AppText weight="regular" size="2xs" color={colors.white}>
          {userData.followerCount} 명이 띱 하는중
        </AppText>
        <IcRightRight />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: colors.grey[300],
  },
  profileText: {
    gap: 4,
  },
  thipCount: {
    flexDirection: "row",
    alignItems: "center",
  },
});
