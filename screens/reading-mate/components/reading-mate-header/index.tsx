import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { AppText, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

export default function ReadingMateHeader() {
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
        <AppText weight="bold" size="2xl" color={colors.white} lineHeight={24}>
          독서메이트
        </AppText>
      }
    />
  );
}
