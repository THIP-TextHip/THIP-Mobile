import { StyleSheet, View } from "react-native";

import { RecordWriteHeader } from "./components";

export default function RecordWriteScreen() {
  return (
    <View style={styles.page}>
      <RecordWriteHeader disabled={true} handleWriteRecord={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
