import { Pressable, StyleSheet } from "react-native";

import { colors } from "@theme/token";

import AppText from "../app-text";
import CustomBottomSheet from "../custom-bottom-sheet";

interface CommentBottomSheetProps {
  commentId: number;
  isWriter: boolean;
  isVisible: boolean;
  handleCloseBottomSheet: () => void;
}

export default function CommentBottomSheet({
  commentId,
  isWriter,
  isVisible,
  handleCloseBottomSheet,
}: CommentBottomSheetProps) {
  const handlePressButton = () => {
    if (isWriter) {
      console.log(commentId, "번 댓글 삭제");
      handleCloseBottomSheet();
    } else {
      console.log(commentId, "번 댓글 신고");
      handleCloseBottomSheet();
    }
  };

  return (
    <CustomBottomSheet
      isVisible={isVisible}
      handleClose={handleCloseBottomSheet}
    >
      <Pressable style={styles.bottomSheetButton} onPress={handlePressButton}>
        <AppText
          weight="medium"
          size="base"
          color={isWriter ? colors.white : colors.red}
        >
          {isWriter ? "댓글 삭제하기" : "댓글 신고하기"}
        </AppText>
      </Pressable>
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
