import { FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AlarmResponse, AlarmType } from "../../types";
import AlarmEmptyView from "../alarm-empty-view";
import AlarmItem from "../alarm-item";

interface AlarmListProps {
  filter: AlarmType | null;
  alarmData: AlarmResponse[];
}

export default function AlarmList({ filter, alarmData }: AlarmListProps) {
  const { bottom } = useSafeAreaInsets();

  const filteredAlarmList =
    filter === null
      ? alarmData
      : alarmData.filter((item) => item.notificationType === filter);

  return filteredAlarmList.length > 0 ? (
    <FlatList
      contentContainerStyle={[styles.content, { paddingBottom: bottom }]}
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
