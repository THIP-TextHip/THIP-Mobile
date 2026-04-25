import { StyleSheet, View } from "react-native";

import { SelectChip } from "@shared/ui";

interface MyGroupTopFilterProps {
  myGroupType: "playing" | "recruiting" | null;
  handleSelectType: (type: "playing" | "recruiting") => void;
}

const MY_GROUP_FILTERS = [
  { label: "진행중", type: "playing" },
  { label: "모집중", type: "recruiting" },
] as const;

export default function MyGroupTopFilter({
  myGroupType,
  handleSelectType,
}: MyGroupTopFilterProps) {
  return (
    <View style={styles.container}>
      {MY_GROUP_FILTERS.map(({ label, type }) => (
        <SelectChip
          key={type}
          label={label}
          isSelected={myGroupType === type}
          handleSelect={() => handleSelectType(type)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    gap: 12,
  },
});
