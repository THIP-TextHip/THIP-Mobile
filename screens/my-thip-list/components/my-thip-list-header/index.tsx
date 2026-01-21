import { router } from "expo-router";
import { useCallback } from "react";

import { IcArrowLeft } from "@images/icons";
import { AppText, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

export default function MyThipListHeader() {
  const handleGoBack = useCallback(() => {
    router.back();
  }, []);
  return (
    <CustomHeader
      left={<IcArrowLeft onPress={handleGoBack} />}
      center={
        <AppText weight="bold" size="2xl" color={colors.white}>
          내 띱 목록
        </AppText>
      }
    />
  );
}
