import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { CustomHeader } from "@shared/ui";

export default function UserProfileHeader() {
  const handleGoBack = useCallback(() => {
    router.back();
  }, []);
  return (
    <CustomHeader
      left={
        <Pressable onPress={handleGoBack}>
          <IcArrowLeft />
        </Pressable>
      }
    />
  );
}
