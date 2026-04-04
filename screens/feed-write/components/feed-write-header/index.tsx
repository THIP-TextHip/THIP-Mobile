import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { AppText, ButtonHeader, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

interface FeedWriteHeaderProps {
  disabled: boolean;
  handleConfirm: () => void;
}

export default function FeedWriteHeader({
  disabled,
  handleConfirm,
}: FeedWriteHeaderProps) {
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
          새 글
        </AppText>
      }
      right={
        <ButtonHeader disabled={disabled} handleClickButton={handleConfirm}>
          완료
        </ButtonHeader>
      }
    />
  );
}
