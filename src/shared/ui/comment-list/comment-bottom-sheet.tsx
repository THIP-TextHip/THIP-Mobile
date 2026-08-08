import { Pressable, StyleSheet } from "react-native";

import {
  type CommentPostType,
  useDeleteCommentMutation,
  useReportCommentMutation,
} from "@apis/comment";
import { colors } from "@theme/token";

import AppText from "../app-text";
import CustomBottomSheet from "../custom-bottom-sheet";
import { LoadingOverlay } from "../loading";

interface CommentBottomSheetProps {
  postId: number | string;
  postType: CommentPostType;
  commentId: number;
  isWriter: boolean;
  isVisible: boolean;
  handleCloseBottomSheet: () => void;
}

export default function CommentBottomSheet({
  postId,
  postType,
  commentId,
  isWriter,
  isVisible,
  handleCloseBottomSheet,
}: CommentBottomSheetProps) {
  const { deleteComment, isPendingDeleteComment } = useDeleteCommentMutation();
  const { reportComment, isPendingReportComment } = useReportCommentMutation();

  const handlePressButton = () => {
    if (isWriter) {
      if (isPendingDeleteComment) return null;
      deleteComment(
        { postId, postType, commentId },
        { onSettled: () => handleCloseBottomSheet() },
      );
    } else {
      if (isPendingReportComment) return null;

      // 바텀시트를 먼저 닫아야 LoadingOverlay가 가려지지 않는다.
      handleCloseBottomSheet();
      reportComment({ commentId });
    }
  };

  return (
    <>
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
      <LoadingOverlay
        visible={isPendingReportComment}
        label="댓글을 신고하는 중이에요"
      />
    </>
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
