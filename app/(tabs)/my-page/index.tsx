import { AppText } from "@shared/ui";
import { colors } from "@theme/token";
import React from "react";
import { View } from "react-native";

export default function MyPage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppText weight="bold" color={colors.character.orange} size="xl">
        내 정보
      </AppText>
    </View>
  );
}
