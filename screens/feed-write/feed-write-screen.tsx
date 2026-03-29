import { StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { FeedWriteHeader } from "./components";

export default function FeedWriteScreen() {
  return (
    <View style={styles.page}>
      <FeedWriteHeader />
      <AppText color={colors.white}>새글 작성</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
