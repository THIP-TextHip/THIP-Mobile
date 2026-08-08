import { Pressable, StyleSheet, View } from "react-native";

import {
  useCheckAllNotification,
  type NotificationType,
} from "@apis/notification";
import { AppText, SelectChip } from "@shared/ui";
import { colors } from "@theme/token";

interface AlarmTopFilterProps {
  hasUncheckedNotification: boolean;
  alarmType: NotificationType | null;
  handleSelectType: (type: NotificationType) => void;
}

const ALARM_FILTERS = [
  { label: "피드", type: "feed" },
  { label: "모임", type: "room" },
] as const;

export default function AlarmTopFilter({
  hasUncheckedNotification,
  alarmType,
  handleSelectType,
}: AlarmTopFilterProps) {
  const { checkAllNotification, isPendingCheckAllNotification } =
    useCheckAllNotification();

  const handleCheckAllNotification = () => {
    if (isPendingCheckAllNotification || !hasUncheckedNotification) return;
    checkAllNotification();
  };

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        {ALARM_FILTERS.map(({ label, type }) => (
          <SelectChip
            key={type}
            label={label}
            isSelected={alarmType === type}
            handleSelect={() => handleSelectType(type)}
          />
        ))}
      </View>
      {hasUncheckedNotification && (
        <Pressable
          onPress={handleCheckAllNotification}
          disabled={isPendingCheckAllNotification || !hasUncheckedNotification}
          accessibilityRole="button"
          accessibilityLabel="모든 알림 읽음 처리"
          hitSlop={5}
        >
          <AppText weight="regular" size="sm" color={colors.grey[300]}>
            모두읽기
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  filter: {
    flexDirection: "row",
    gap: 12,
  },
});
