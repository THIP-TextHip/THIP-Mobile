import { StyleSheet, View } from "react-native";

import { SelectChip } from "@shared/ui";

import { AlarmType } from "../../types";

interface TopFilterBarProps {
  alarmType: AlarmType | null;
  handleSelectType: (type: AlarmType) => void;
}

const ALARM_FILTERS = [
  { label: "피드", type: "feed" },
  { label: "모임", type: "room" },
] as const;

export default function TopFilterBar({
  alarmType,
  handleSelectType,
}: TopFilterBarProps) {
  return (
    <View style={styles.container}>
      {ALARM_FILTERS.map(({ label, type }) => (
        <SelectChip
          key={type}
          label={label}
          isSelected={alarmType === type}
          handleSelect={() => handleSelectType(type)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 12,
  },
});
