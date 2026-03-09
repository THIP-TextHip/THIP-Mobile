import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { AppText, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

export default function MyThipListHeader() {
  const handleGoBack = useCallback(() => {
    router.back();
  }, []);
  return (
    <CustomHeader
      left={
        <Pressable onPress={handleGoBack}>
          <IcArrowLeft />
        </Pressable>
      }
      center={
        <AppText weight="bold" size="2xl" color={colors.white}>
          내 띱 목록
        </AppText>
      }
    />
  );
}
