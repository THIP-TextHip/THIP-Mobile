import { StyleSheet, TextInput, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors, typography } from "@theme/token";
import {
  FEED_CONTENT_MAX_LENGTH,
  FEED_CONTENT_PLACEHOLDER,
} from "../../constants";

interface FeedContentSectionProps {
  contentBody: string;
  handleChangeContentBody: (contentBody: string) => void;
}

export default function FeedContentSection({
  contentBody,
  handleChangeContentBody,
}: FeedContentSectionProps) {
  return (
    <View style={styles.section}>
      <AppText weight="semibold" size="lg" color={colors.white} lineHeight={24}>
        글 작성
      </AppText>
      <TextInput
        style={styles.input}
        value={contentBody}
        onChangeText={handleChangeContentBody}
        placeholder={FEED_CONTENT_PLACEHOLDER}
        placeholderTextColor={colors.grey[300]}
        selectionColor={colors.neongreen}
        cursorColor={colors.neongreen}
        multiline
        maxLength={FEED_CONTENT_MAX_LENGTH}
      />
      <AppText
        weight="regular"
        size="xs"
        color={
          contentBody.length !== FEED_CONTENT_MAX_LENGTH
            ? colors.neongreen
            : colors.red
        }
        style={styles.count}
      >
        {contentBody.length} / {FEED_CONTENT_MAX_LENGTH}
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
