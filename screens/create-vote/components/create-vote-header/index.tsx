import { Pressable } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { AppText, ButtonHeader, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

interface CreateVoteHeaderProps {
  disabled: boolean;
  handleGoBack: () => void;
  handleCreateVote: () => void;
}

export default function CreateVoteHeader({
  disabled,
  handleGoBack,
  handleCreateVote,
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
          투표 생성
        </AppText>
      }
      right={
        <ButtonHeader disabled={disabled} handleClickButton={handleCreateVote}>
          완료
        </ButtonHeader>
      }
    />
  );
}
