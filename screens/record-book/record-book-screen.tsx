import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

import { RecordBookFloating } from "./components";

export default function RecordBookScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  return (
    <View style={styles.page}>
      <RecordBookFloating roomId={roomId} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
