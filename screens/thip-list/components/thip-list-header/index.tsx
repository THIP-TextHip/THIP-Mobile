import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { colors } from "@/src/theme/token";
import { IcArrowLeft } from "@images/icons";
import { AppText, CustomHeader } from "@shared/ui";

export default function ThpiListHeader() {
  const handleGoBack = useCallback(() => {
    router.back();
  }, []);
  return (
    <CustomHeader
      left={
        <Pressable
          onPress={handleGoBack}
          accessibilityRole="button"
          accessibilityLabel="뒤로가기"
          hitSlop={10}
        >
          <IcArrowLeft />
        </Pressable>
      }
      center={
        <AppText weight="bold" size="2xl" color={colors.white}>
          띱 목록
        </AppText>
      }
    />
  );
}
