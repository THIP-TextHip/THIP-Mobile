import { StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function UserProfileFeedEmpty() {
  return (
    <View style={styles.container}>
      <AppText weight="semibold" size="lg" color={colors.white}>
        피드에 작성된 글이 없어요.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
