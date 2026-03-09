import { Pressable, StyleSheet, View } from "react-native";

import { AppText, CustomBottomSheet } from "@shared/ui";
import { colors } from "@theme/token";

// TODO: 추후 api 연동 시 수정
interface FeedDetailBottomSheetProps {
  isWriter: boolean;
  isVisible: boolean;
  handleCloseBottomSheet: () => void;
  handleReport: () => void;
  handleToEdit: () => void;
  handleDelete: () => void;
}

export default function FeedDetailBottomSheet({
  isWriter,
  isVisible,
  handleCloseBottomSheet,
  handleReport,
  handleToEdit,
  handleDelete,
}: FeedDetailBottomSheetProps) {
  return (
    <CustomBottomSheet
      isVisible={isVisible}
      handleClose={handleCloseBottomSheet}
    >
      {isWriter ? (
        <View style={styles.bottomSheetContentWrapper}>
          <Pressable style={styles.bottomSheetButton} onPress={handleToEdit}>
            <AppText weight="medium" size="base" color={colors.white}>
              수정하기
            </AppText>
          </Pressable>
          <View style={styles.bottomSheetDivider} />
          <Pressable style={styles.bottomSheetButton} onPress={handleDelete}>
            <AppText weight="medium" size="base" color={colors.red}>
              삭제하기
            </AppText>
          </Pressable>
        </View>
      ) : (
        <Pressable style={styles.bottomSheetButton} onPress={handleReport}>
          <AppText weight="medium" size="base" color={colors.red}>
            신고하기
          </AppText>
        </Pressable>
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
