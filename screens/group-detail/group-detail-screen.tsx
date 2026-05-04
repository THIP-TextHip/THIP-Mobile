import { StyleSheet, View } from "react-native";

import { GroupDetailHeader } from "./components";

export default function GroupDetailScreen() {
  return (
    <View style={styles.page}>
      <GroupDetailHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
