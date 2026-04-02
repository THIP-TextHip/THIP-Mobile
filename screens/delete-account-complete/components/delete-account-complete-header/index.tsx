import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { CustomHeader } from "@shared/ui";

export default function DeleteAccountCompleteHeader() {
  const handleToLogin = useCallback(() => {
    router.replace("/login");
  }, []);

  return (
    <CustomHeader
      left={
        <Pressable onPress={handleToLogin} hitSlop={10}>
          <IcArrowLeft />
        </Pressable>
      }
    />
  );
}
