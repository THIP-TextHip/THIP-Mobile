import { AppText } from "@shared/ui";
import { colors } from "@theme/token";
import React from "react";
import { View } from "react-native";

export default function Group() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppText weight="extrabold" size="lg" color={colors.character.lavender}>
        모임
      </AppText>
    </View>
  );
}
