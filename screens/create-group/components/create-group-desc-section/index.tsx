import { StyleSheet, TextInput, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors, typography } from "@theme/token";

import { GROUP_DESC_MAX_LENGTH, GROUP_DESC_PLACEHOLDER } from "../../constants";

interface CreateGroupDescSectionProps {
  groupDesc: string;
  handleChangeGroupDesc: (groupDesc: string) => void;
}

export default function CreateGroupDescSection({
  groupDesc,
  handleChangeGroupDesc,
}: CreateGroupDescSectionProps) {
  // 엔터키로 줄바꿈 되지 않도록 방지
  const handleChangeWithoutLineBreak = (text: string) => {
    handleChangeGroupDesc(text.replace(/[\r\n]/g, ""));
  };

  return (
    <View style={styles.section}>
      <AppText weight="semibold" size="lg" color={colors.white} lineHeight={24}>
        한 줄 소개
      </AppText>
      <TextInput
        style={styles.input}
        value={groupDesc}
        onChangeText={handleChangeWithoutLineBreak}
        placeholder={GROUP_DESC_PLACEHOLDER}
        placeholderTextColor={colors.grey[300]}
        selectionColor={colors.neongreen}
        cursorColor={colors.neongreen}
        maxLength={GROUP_DESC_MAX_LENGTH}
        multiline
      />
      <AppText
        style={styles.count}
        weight="regular"
        size="xs"
        color={
          groupDesc.length !== GROUP_DESC_MAX_LENGTH
            ? colors.neongreen
            : colors.red
        }
      >
        {groupDesc.length} / 75
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
