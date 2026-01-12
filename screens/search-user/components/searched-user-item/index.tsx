import { Image, Pressable, StyleSheet, View } from "react-native";

import { IcRightRight } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { SearchUserResponse } from "../../types";

interface SearchedUserItemProps {
  userData: SearchUserResponse;
}

export default function SearchedUserItem({ userData }: SearchedUserItemProps) {
  const handleToUserProfile = () => {
    console.log(userData.nickname, " 프로필로 이동");
  };
  return (
    <Pressable style={styles.container} onPress={handleToUserProfile}>
      <View style={styles.profile}>
        <Image
          source={{ uri: userData.profileImageUrl }}
          style={styles.profileImage}
        />
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
  },
  profileText: {
    gap: 4,
  },
  thipCount: {
    flexDirection: "row",
    alignItems: "center",
  },
});
