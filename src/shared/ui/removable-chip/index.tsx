import { Pressable, StyleSheet } from "react-native";

import { IcX } from "@images/icons";
import { colors } from "@theme/token";
import AppText from "../app-text";

interface RemovableChipProps {
  text: string;
  isTag?: boolean;
  handleClickChip?: () => void;
  handleRemove: () => void;
}

export default function RemovableChip({
  text,
  isTag = false,
  handleClickChip,
  handleRemove,
}: RemovableChipProps) {
  const iconSize = isTag ? 20 : 24;
  return (
    <Pressable
      style={[styles.container, isTag ? { gap: 2 } : { gap: 4 }]}
      onPress={handleClickChip}
    >
      <AppText
        weight="regular"
        size={isTag ? "xs" : "sm"}
        color={colors.grey[200]}
      >
        {text}
      </AppText>
      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
      >
        <IcX width={iconSize} height={iconSize} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingLeft: 12,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.grey[300],
  },
});
