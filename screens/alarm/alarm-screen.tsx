import { useState } from "react";
import { StyleSheet, View } from "react-native";

import {
  type NotificationType,
  useGetUncheckedNotificationExistsQuery,
} from "@apis/notification";

import { AlarmList, AlarmTopFilter } from "./components";

export default function AlarmScreen() {
  const [alarmType, setAlarmType] = useState<NotificationType | null>(null);
  const { hasUncheckedNotification, refetchUncheckedNotificationExists } =
    useGetUncheckedNotificationExistsQuery();

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
        hasUncheckedNotification={hasUncheckedNotification}
        alarmType={alarmType}
        handleSelectType={handleSelectType}
      />
      <AlarmList
        filter={alarmType}
        refetchUncheckedNotificationExists={refetchUncheckedNotificationExists}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
