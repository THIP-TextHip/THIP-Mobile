import { StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function MyFeedEmpty() {
  return (
    <View style={styles.conatainer}>
      <AppText weight="semibold" size="lg" color={colors.white}>
        피드에 글을 작성해보세요
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    marginBottom: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
