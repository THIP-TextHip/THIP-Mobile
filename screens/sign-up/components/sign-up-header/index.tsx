import { router } from "expo-router";
import { Pressable } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { AppText, ButtonHeader, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

interface SignUpHeaderProps {
  step: 1 | 2;
  disabled: boolean;
  handleClickNext: () => void;
}

export default function SignUpHeader({
  step,
  disabled,
  handleClickNext,
}: SignUpHeaderProps) {
  const handleClickBack = () => {
    router.back();
  };
  return (
    <CustomHeader
      left={
        step === 2 && (
          <Pressable onPress={handleClickBack}>
            <IcArrowLeft />
          </Pressable>
        )
      }
      center={
        <AppText weight="bold" size="2xl" color={colors.white}>
          설정 {step}/2
        </AppText>
      }
      right={
        <ButtonHeader disabled={disabled} handleClickButton={handleClickNext}>
          다음
        </ButtonHeader>
      }
    />
  );
}
