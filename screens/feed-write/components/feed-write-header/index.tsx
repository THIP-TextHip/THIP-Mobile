import { Pressable } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { AppText, ButtonHeader, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

interface FeedWriteHeaderProps {
  isEdit: boolean;
  disabled: boolean;
  handleGoBack: () => void;
  handleConfirm: () => void;
}

export default function FeedWriteHeader({
  isEdit,
  disabled,
  handleGoBack,
  handleConfirm,
}: FeedWriteHeaderProps) {
  return (
    <CustomHeader
      left={
        <Pressable onPress={handleGoBack} hitSlop={10}>
          <IcArrowLeft />
        </Pressable>
      }
      center={
        <AppText weight="bold" size="2xl" color={colors.white} lineHeight={24}>
          {isEdit ? "글 수정" : "새 글"}
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
