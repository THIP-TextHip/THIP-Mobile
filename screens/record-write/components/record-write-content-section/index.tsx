import { StyleSheet, TextInput, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors, typography } from "@theme/token";

import {
  RECORD_WRITE_MAX_LENGTH,
  RECORD_WRITE_PLACEHOLDER,
} from "../../constants";

interface RecordWriteContentSectionProps {
  content: string;
  handleChangeContent: (content: string) => void;
}

export default function RecordWriteContentSection({
  content,
  handleChangeContent,
}: RecordWriteContentSectionProps) {
  return (
    <View style={styles.section}>
      <AppText weight="semibold" size="lg" color={colors.white} lineHeight={24}>
        지금 읽은 그 부분, 어땠나요?
      </AppText>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={handleChangeContent}
        placeholder={RECORD_WRITE_PLACEHOLDER}
        placeholderTextColor={colors.grey[300]}
        selectionColor={colors.neongreen}
        cursorColor={colors.neongreen}
        maxLength={RECORD_WRITE_MAX_LENGTH}
        multiline
      />
      <AppText
        style={styles.count}
        weight="regular"
        size="xs"
        color={colors.neongreen}
      >
        {content.length} / {RECORD_WRITE_MAX_LENGTH}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  input: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: 24,
  },
  count: {
    textAlign: "right",
  },
});
