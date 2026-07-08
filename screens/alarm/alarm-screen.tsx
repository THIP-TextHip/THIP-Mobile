import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { NotificationType } from "@apis/notification";

import { AlarmList, AlarmTopFilter } from "./components";

export default function AlarmScreen() {
  const [alarmType, setAlarmType] = useState<NotificationType | null>(null);

  const handleSelectType = (type: NotificationType) => {
    if (type === alarmType) {
      setAlarmType(null);
      return;
    }
    setAlarmType(type);
  };

  return (
    <View style={styles.page}>
      <AlarmTopFilter
        alarmType={alarmType}
        handleSelectType={handleSelectType}
      />
      <AlarmList filter={alarmType} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
