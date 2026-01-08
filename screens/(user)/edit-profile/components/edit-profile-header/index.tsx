import { router } from "expo-router";
import { useCallback } from "react";

import { IcArrowLeft } from "@images/icons";
import { AppText, ButtonHeader, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

interface EditProfileHeaderProps {
  disabled: boolean;
  handleUpdateProfile: () => void;
}

export default function EditProfileHeader({
  disabled,
  handleUpdateProfile,
}: EditProfileHeaderProps) {
  const handleGoBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <CustomHeader
      left={<IcArrowLeft onPress={handleGoBack} />}
      center={
        <AppText weight="bold" size="2xl" color={colors.white}>
          프로필 편집
        </AppText>
      }
      right={
        <ButtonHeader
          disabled={disabled}
          handleClickButton={handleUpdateProfile}
        >
          완료
        </ButtonHeader>
      }
    />
  );
}
