import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { IcArrowLeft, IcMore } from "@images/icons";
import { CustomHeader } from "@shared/ui";

interface FeedDetailHeaderProps {
  handlePressMore: () => void;
}

export default function FeedDetailHeader({
  handlePressMore,
}: FeedDetailHeaderProps) {
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
      right={
        <Pressable onPress={handlePressMore}>
          <IcMore />
        </Pressable>
      }
    />
  );
}
