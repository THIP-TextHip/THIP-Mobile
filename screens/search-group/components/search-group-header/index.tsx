import { router } from "expo-router";
import React, { useCallback } from "react";
import { Pressable } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { AppText, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

export default function SearchGroupHeader() {
  const handleGoBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <CustomHeader
      left={
        <Pressable onPress={handleGoBack} hitSlop={10}>
          <IcArrowLeft />
        </Pressable>
      }
      center={
        <AppText weight="bold" size="2xl" color={colors.white} lineHeight={24}>
          모임 검색
        </AppText>
      }
    />
  );
}
