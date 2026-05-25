import { Pressable } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { AppText, ButtonHeader, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

interface CreateVoteHeaderProps {
  isEdit: boolean;
  disabled: boolean;
  handleGoBack: () => void;
  handleComplete: () => void;
}

export default function CreateVoteHeader({
  isEdit,
  disabled,
  handleGoBack,
  handleComplete,
}: CreateVoteHeaderProps) {
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
          투표 {isEdit ? "수정" : "작성"}
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
