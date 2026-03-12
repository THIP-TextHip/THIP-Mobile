import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IcReplyGrey, IcSend, IcX } from "@images/icons";
import { colors, typography } from "@theme/token";

import AppText from "../app-text";

interface ChatInputBarProps {
  text: string;
  placeholder: string;
  setText: (text: string) => void;
  handleSend: () => void;
  targetName?: string;
  handleResetReply?: () => void;
}

export default function ChatInputBar({
  text,
  placeholder,
  setText,
  handleSend,
  targetName,
  handleResetReply,
}: ChatInputBarProps) {
  const insets = useSafeAreaInsets();

  const handleChangeText = (text: string) => {
    setText(text);
  };

  const handlePressSend = () => {
    if (!text.trim()) return;

    if (targetName && handleResetReply) handleResetReply();

    handleSend();
    Keyboard.dismiss();
  };

  const ableToSend = text.trim().length !== 0;

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? insets.bottom : insets.bottom + 10
      }
      style={styles.container}
    >
      {targetName && (
        <View style={styles.replyContainer}>
          <View style={styles.replyTextWrapper}>
            <IcReplyGrey style={styles.replyIcon} />
            <AppText size="xs" color={colors.neongreen}>
              @{targetName}
            </AppText>
            <AppText size="xs" color={colors.grey[200]}>
              님에게 답글 작성
            </AppText>
          </View>
          <Pressable onPress={handleResetReply} hitSlop={5}>
            <IcX />
          </Pressable>
        </View>
      )}
      <View style={[styles.inputContainer, { marginBottom: insets.bottom }]}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.grey[300]}
          selectionColor={colors.neongreen}
          cursorColor={colors.neongreen}
          multiline
        />
        <Pressable
          style={[
            styles.button,
            ableToSend && { backgroundColor: colors.purple.main },
          ]}
          onPress={handlePressSend}
          disabled={!ableToSend}
        >
          <IcSend />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.darkgrey.dark,
    gap: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    paddingLeft: 12,
    backgroundColor: colors.darkgrey.main,
    borderRadius: 20,
    gap: 12,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    paddingVertical: 5,
    maxHeight: 100,
  },
  button: {
    paddingVertical: 2,
    paddingHorizontal: 9,
    borderRadius: 20,
    backgroundColor: colors.grey[300],
    alignSelf: "flex-end",
  },
  replyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  replyTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  replyIcon: {
    marginRight: 2,
  },
});
