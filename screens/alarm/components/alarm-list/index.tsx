import { FlatList, StyleSheet } from "react-native";

import { AlarmResponse, AlarmType } from "../../types";
import AlarmEmptyView from "../alarm-empty-view";
import AlarmItem from "../alarm-item";

interface AlarmListProps {
  filter: AlarmType | null;
  alarmData: AlarmResponse[];
}

export default function AlarmList({ filter, alarmData }: AlarmListProps) {
  const filteredAlarmList =
    filter === null
      ? alarmData
      : alarmData.filter((item) => item.notificationType === filter);

  return filteredAlarmList.length > 0 ? (
    <FlatList
      contentContainerStyle={styles.content}
      data={filteredAlarmList}
      keyExtractor={(item) => String(item.notificationId)}
      renderItem={({ item }) => <AlarmItem alarm={item} />}
    />
  ) : (
    <AlarmEmptyView />
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, gap: 20, paddingBottom: 20 },
});
