import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { IcArrowLeft, IcMore } from "@images/icons";
import { CustomHeader } from "@shared/ui";

interface UserProfileHeaderProps {
  handlePressMore: () => void;
}

export default function UserProfileHeader({
  handlePressMore,
}: UserProfileHeaderProps) {
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
      right={
        <Pressable
          onPress={handlePressMore}
          accessibilityRole="button"
          accessibilityLabel="바텀시트 열기"
          hitSlop={10}
        >
          <IcMore />
        </Pressable>
      }
    />
  );
}
