import Ionicons from "@expo/vector-icons/Ionicons";

import { AppText, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";
import { router } from "expo-router";

export default function SearchUserHeader() {
  const handleGoBack = () => {
    router.back();
  };

  return (
    <CustomHeader
      left={
        <Ionicons
          name="arrow-back"
          size={24}
          color={colors.white}
          onPress={handleGoBack}
        />
      }
      center={
        <AppText weight="bold" size="2xl" color={colors.white}>
          사용자 찾기
        </AppText>
      }
    />
  );
}
