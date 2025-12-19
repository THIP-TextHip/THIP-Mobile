import { AppText } from "@shared/ui";
import { colors } from "@theme/token";
import { View } from "react-native";

export default function Feed() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppText weight="extrabold" size="lg" color={colors.purple.sub}>
        피드
      </AppText>
    </View>
  );
}
