import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { AppText, ButtonHeader, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

interface CreateGroupHeaderProps {
  disabled: boolean;
  handleConfirm: () => void;
}

export default function CreateGroupHeader({
  disabled,
  handleConfirm,
}: CreateGroupHeaderProps) {
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
        <AppText weight="bold" size="xl" color={colors.white} lineHeight={24}>
          모임 만들기
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
