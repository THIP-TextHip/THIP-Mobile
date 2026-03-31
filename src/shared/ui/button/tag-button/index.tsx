import { Pressable, StyleSheet } from "react-native";

import { colors } from "@theme/token";

import AppText from "../../app-text";

interface TagButtonProps {
  tag: string;
  isSelected: boolean;
  handlePressTag: () => void;
}

export default function TagButton({
  tag,
  isSelected,
  handlePressTag,
}: TagButtonProps) {
  return (
    <Pressable
      style={[
        styles.container,
        isSelected && { borderColor: colors.purple.main },
      ]}
      onPress={handlePressTag}
    >
      <AppText
        weight={isSelected ? "semibold" : "regular"}
        size="xs"
        color={isSelected ? colors.purple.main : colors.grey[200]}
      >
        {tag}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grey[300],
  },
});
