import { StyleSheet, View } from "react-native";

import { RecordBookFloating } from "./components";

export default function RecordBookScreen() {
  return (
    <View style={styles.page}>
      <RecordBookFloating />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
