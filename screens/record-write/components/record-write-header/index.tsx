import { Pressable } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { AppText, ButtonHeader, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

interface RecordWriteHeaderProps {
  isEdit: boolean;
  disabled: boolean;
  handleGoBack: () => void;
  handleComplete: () => void;
}

export default function RecordWriteHeader({
  isEdit,
  disabled,
  handleGoBack,
  handleComplete,
}: RecordWriteHeaderProps) {
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
          기록 {isEdit ? "수정" : "작성"}
        </AppText>
      }
      right={
        <ButtonHeader disabled={disabled} handleClickButton={handleComplete}>
          완료
        </ButtonHeader>
      }
    />
  );
}
