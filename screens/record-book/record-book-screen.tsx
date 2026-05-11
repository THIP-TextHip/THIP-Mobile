import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { RecordBookFloating, RecordBookTopTabBar } from "./components";

export default function RecordBookScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const [isMyRecord, setIsMyRecord] = useState(false);

  const handleGroupRecord = () => {
    setIsMyRecord(false);
  };

  const handleMyRecord = () => {
    setIsMyRecord(true);
  };

  // TODO: 추후 에러 화면 표시
  if (!roomId || Array.isArray(roomId)) {
    return null;
  }

  return (
    <View style={styles.page}>
      <RecordBookTopTabBar
        isMyRecord={isMyRecord}
        handleGroupRecord={handleGroupRecord}
        handleMyRecord={handleMyRecord}
      />
      <RecordBookFloating roomId={roomId} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
