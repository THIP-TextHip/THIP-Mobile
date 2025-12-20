import { AppText } from "@shared/ui";
import { colors } from "@theme/token";
import { View } from "react-native";

export default function SearchUser() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppText weight="extrabold" size="lg" color={colors.neongreen}>
        사용자 검색
      </AppText>
    </View>
  );
}
