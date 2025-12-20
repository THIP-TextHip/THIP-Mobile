import { View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function Alarm() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppText weight="extrabold" size="lg" color={colors.character.lavender}>
        알림
      </AppText>
    </View>
  );
}
