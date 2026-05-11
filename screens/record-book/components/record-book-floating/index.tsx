import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import {
  FloatingRecordBookOption,
  FloatingRecordBookOptionClose,
  IcVote,
  IcWrite,
} from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface RecordBookFloatingProps {
  roomId: string;
}

export default function RecordBookFloating({
  roomId,
}: RecordBookFloatingProps) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const handlePressOption = () => {
    setIsOptionOpen((prev) => !prev);
  };

  const handleToRecordWrite = () => {
    router.push({
      pathname: "/record-write/[roomId]",
      params: { roomId },
    });
  };

  const handleToCreateVote = () => {
    router.push({
      pathname: "/create-vote/[roomId]",
      params: { roomId },
    });
  };

  return (
    <Pressable style={styles.floating} onPress={handlePressOption}>
      {isOptionOpen ? (
        <View style={styles.wrapper}>
          <View style={styles.optionContainer}>
            <Pressable
              style={styles.option}
              onPress={handleToRecordWrite}
              accessibilityRole="button"
              accessibilityLabel="기록 작성 페이지로 이동"
            >
              <IcWrite />
              <AppText weight="medium" size="base" color={colors.white}>
                기록 작성
              </AppText>
            </Pressable>
            <Pressable
              style={styles.option}
              onPress={handleToCreateVote}
              accessibilityRole="button"
              accessibilityLabel="투표 생성 페이지로 이동"
            >
              <IcVote />
              <AppText weight="medium" size="base" color={colors.white}>
                투표 생성
              </AppText>
            </Pressable>
          </View>
          <FloatingRecordBookOptionClose />
        </View>
      ) : (
        <FloatingRecordBookOption />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  floating: {
    position: "absolute",
    bottom: 32,
    right: 20,
  },
  wrapper: {
    gap: 12,
    alignItems: "flex-end",
  },
  optionContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.neongreen,
    backgroundColor: colors.black.main,
    paddingVertical: 20,
    paddingHorizontal: 12,
    gap: 8,
  },
  option: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    width: 160,
    paddingVertical: 4,
  },
});
