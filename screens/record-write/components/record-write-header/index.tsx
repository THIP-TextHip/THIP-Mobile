import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { AppText, ButtonHeader, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

interface RecordWriteHeaderProps {
  disabled: boolean;
  handleWriteRecord: () => void;
}

export default function RecordWriteHeader({
  disabled,
  handleWriteRecord,
}: RecordWriteHeaderProps) {
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
          기록 작성
        </AppText>
      }
      right={
        <ButtonHeader disabled={disabled} handleClickButton={handleWriteRecord}>
          완료
        </ButtonHeader>
      }
    />
  );
}
