import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { IcRightRight } from "@images/icons";
import { colors } from "@theme/token";

import AppText from "../app-text";
import ProfileImage from "../profile-image";

export interface UserListItemData {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  aliasName: string;
  aliasColor: string;
  followerCount: number;
  isMySelf?: boolean;
}

interface UserListItemProps {
  userData: UserListItemData;
}

export default function UserListItem({ userData }: UserListItemProps) {
  const handleToUserProfile = () => {
    router.push({
      pathname: "/user-profile/[userId]",
      params: { userId: String(userData.userId) },
    });
  };
  return (
    <View style={styles.container}>
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
      <Pressable style={styles.thipCount} onPress={handleToUserProfile}>
        <AppText weight="regular" size="2xs" color={colors.white}>
          {userData.followerCount} 명이 띱 하는중
        </AppText>
        <IcRightRight />
      </Pressable>
    </View>
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
