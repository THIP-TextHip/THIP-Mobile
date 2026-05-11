import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

import { RecordBookFloating } from "./components";

export default function RecordBookScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  // TODO: 추후 에러 화면 표시
  if (!roomId || Array.isArray(roomId)) {
    return null;
  }

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
