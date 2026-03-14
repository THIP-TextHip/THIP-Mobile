import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function UserProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();

  useEffect(() => {
    if (!userId) {
      Toast.show({
        type: "error",
        text1: "해당 유저의 프로필이 존재하지 않습니다.",
      });
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/feed");
      }
    }
  }, [userId]);

  return (
    <View style={{ flex: 1 }}>
      <AppText color={colors.white}>{userId}번 유저의 프로필 페이지</AppText>
    </View>
  );
}
