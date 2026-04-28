import { StyleSheet, TextInput, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors, typography } from "@theme/token";

import {
  GROUP_TITLE_MAX_LENGTH,
  GROUP_TITLE_PLACEHOLDER,
} from "../../constants";

interface CreateGroupTitleSectionProps {
  groupTitle: string;
  handleChangeGroupTitle: (groupTitle: string) => void;
}

export default function CreateGroupTitleSection({
  groupTitle,
  handleChangeGroupTitle,
}: CreateGroupTitleSectionProps) {
  return (
    <View style={styles.section}>
      <AppText weight="semibold" size="lg" color={colors.white} lineHeight={24}>
        방 제목
      </AppText>
      <TextInput
        style={styles.input}
        value={groupTitle}
        onChangeText={handleChangeGroupTitle}
        placeholder={GROUP_TITLE_PLACEHOLDER}
        placeholderTextColor={colors.grey[300]}
        selectionColor={colors.neongreen}
        cursorColor={colors.neongreen}
        maxLength={GROUP_TITLE_MAX_LENGTH}
      />
      <AppText
        style={styles.count}
        weight="regular"
        size="xs"
        color={
          groupTitle.length !== GROUP_TITLE_MAX_LENGTH
            ? colors.neongreen
            : colors.red
        }
      >
        {groupTitle.length} / 15
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
    paddingHorizontal: 20,
  },
  input: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: 20,
  },
  count: {
    textAlign: "right",
  },
});
