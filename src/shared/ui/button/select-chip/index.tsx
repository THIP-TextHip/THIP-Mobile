import { Pressable, StyleSheet } from "react-native";

import { colors, typography } from "@theme/token";
import AppText from "../../app-text";

type SelectChipType = "filter" | "category";

interface SelectChipProps {
  label: string;
  isSelected: boolean;
  handleSelect: () => void;
  type?: SelectChipType;
}

const TEXT_PRESET: Record<
  SelectChipType,
  {
    size: keyof typeof typography.fontSize;
  }
> = {
  filter: { size: "sm" },
  category: { size: "xs" },
};

export default function SelectChip({
  label,
  isSelected,
  handleSelect,
  type = "filter",
}: SelectChipProps) {
  const textPreset = TEXT_PRESET[type];

  return (
    <Pressable
      style={[styles.container, styles[type], isSelected && styles.selected]}
      onPress={handleSelect}
    >
      <AppText
        weight={isSelected ? "medium" : "regular"}
        size={textPreset.size}
        color={colors.white}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.darkgrey.main,
  },
  selected: {
    backgroundColor: colors.purple.main,
  },
  filter: {
    height: 36,
    justifyContent: "center",
  },
  category: {
    paddingVertical: 8,
  },
});
