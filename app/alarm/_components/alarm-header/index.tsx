import { IcArrowLeft } from "@images/icons";
import { AppText, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";
import { router } from "expo-router";

export default function AlarmHeader() {
  const handleGoBack = () => {
    router.back();
  };
  return (
    <CustomHeader
      left={<IcArrowLeft onPress={handleGoBack} />}
      center={
        <AppText weight="bold" size="2xl" color={colors.white}>
          알림
        </AppText>
      }
    />
  );
}
