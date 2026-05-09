import { Pressable, StyleSheet, View } from "react-native";

import { colors } from "@/src/theme/token";
import { AppText, CustomBottomSheet } from "@shared/ui";

interface GroupDetailBottomSheetProps {
  isHost: boolean;
  isVisible: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  handleLeave: () => void;
  handleReport: () => void;
}

export default function GroupDetailBottomSheet({
  isHost,
  isVisible,
  handleClose,
  handleDelete,
  handleLeave,
  handleReport,
}: GroupDetailBottomSheetProps) {
  return (
    <CustomBottomSheet isVisible={isVisible} handleClose={handleClose}>
      {isHost ? (
        <Pressable style={styles.bottomSheetButton} onPress={handleDelete}>
          <AppText weight="medium" size="base" color={colors.red}>
            방 삭제하기
          </AppText>
        </Pressable>
      ) : (
        <View style={styles.bottomSheetContentWrapper}>
          <Pressable style={styles.bottomSheetButton} onPress={handleLeave}>
            <AppText weight="medium" size="base" color={colors.white}>
              방 나가기
            </AppText>
          </Pressable>
          <View style={styles.bottomSheetDivider} />
          <Pressable style={styles.bottomSheetButton} onPress={handleReport}>
            <AppText weight="medium" size="base" color={colors.red}>
              방 신고하기
            </AppText>
          </Pressable>
        </View>
      )}
    </CustomBottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetContentWrapper: {
    gap: 8,
  },
  bottomSheetDivider: {
    backgroundColor: "#525252",
    width: "100%",
    height: 1,
  },
  bottomSheetButton: {
    paddingHorizontal: 12,
    height: 50,
    justifyContent: "center",
  },
});
