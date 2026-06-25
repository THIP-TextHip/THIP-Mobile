import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useKeyboardHeight } from "@shared/hooks";
import {
  AppText,
  ChatInputBar,
  CommentListType,
  CommentRoot,
} from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_RECORD_COMMENT_LIST } from "../../constants";

interface RecordCommentBottomSheetProps {
  postId: number;
  isVisible: boolean;
  handleClose: () => void;
}

export default function RecordCommentBottomSheet({
  // TODO: 서버 api 연동 시 postId로 댓글 목록 조회/전송
  postId,
  isVisible,
  handleClose,
}: RecordCommentBottomSheetProps) {
  const { bottom } = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheet>(null);

  const [comment, setComment] = useState("");
  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  const [replyNickname, setReplyNickname] = useState("");
  const [isInputFocus, setIsInputFocus] = useState(false);
  const keyboardHeight = useKeyboardHeight();

  const listPaddingBottom =
    (replyNickname !== "" ? 30 : 0) +
    (isInputFocus ? keyboardHeight + bottom : bottom);

  const handleSendText = () => {
    if (replyCommentId !== null) {
      console.log(
        replyNickname,
        "에게 ",
        replyCommentId,
        "번에 대한 답글 ",
        comment.trim(),
        " 전송",
      );
    } else {
      console.log(comment.trim(), " 전송");
    }
    setComment("");
  };

  const handlePressReply = (commentId: number, replyNickname: string) => {
    setReplyCommentId(commentId);
    setReplyNickname(replyNickname);
  };

  const handleResetReply = () => {
    setReplyCommentId(null);
    setReplyNickname("");
    setIsInputFocus(false);
  };

  useEffect(() => {
    if (isInputFocus) {
      sheetRef.current?.snapToIndex(1);
    }
  }, [isInputFocus]);

  return (
    isVisible && (
      <GestureHandlerRootView style={[styles.root, styles.backdrop]}>
        <BottomSheet
          onClose={handleClose}
          ref={sheetRef}
          snapPoints={["65%", "97%"]}
          enableHandlePanningGesture
          enablePanDownToClose
          handleStyle={styles.handle}
          handleIndicatorStyle={styles.handleIndicator}
          backdropComponent={(props) => (
            <>
              <BlurView
                intensity={15}
                tint="dark"
                style={[styles.backdrop, !isVisible && { display: "none" }]}
                pointerEvents="none"
              />
              <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior="close"
              />
            </>
          )}
          style={styles.container}
          backgroundStyle={styles.sheetBackground}
        >
          <AppText
            style={styles.title}
            weight="bold"
            size="xl"
            color={colors.white}
            lineHeight={24}
          >
            댓글
          </AppText>
          <BottomSheetFlatList
            contentContainerStyle={[
              styles.list,
              {
                paddingBottom:
                  listPaddingBottom + (Platform.OS === "ios" ? 80 : 90),
              },
            ]}
            data={DUMMY_RECORD_COMMENT_LIST}
            keyExtractor={(item: CommentListType) => String(item.commentId)}
            renderItem={({ item }: { item: CommentListType }) => (
              <CommentRoot
                type="record"
                comment={item}
                handlePressReply={handlePressReply}
              />
            )}
            ListEmptyComponent={() => (
              <View style={styles.empty}>
                <AppText weight="semibold" size="lg" color={colors.white}>
                  아직 댓글이 없어요
                </AppText>
                <AppText weight="regular" size="sm" color={colors.grey[100]}>
                  첫번째 댓글을 남겨보세요
                </AppText>
              </View>
            )}
          />
        </BottomSheet>
        <ChatInputBar
          text={comment}
          placeholder="여러분의 생각을 남겨주세요."
          setText={setComment}
          handleSend={handleSendText}
          targetName={replyNickname}
          handleResetReply={handleResetReply}
          isFocus={isInputFocus}
          handleIsFocus={setIsInputFocus}
        />
      </GestureHandlerRootView>
    )
  );
}

const styles = StyleSheet.create({
  root: {
    zIndex: 10,
  },
  container: {
    paddingVertical: 10,
  },
  sheetBackground: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.darkgrey.main,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(18, 18, 18, 0.30)",
  },
  list: {
    gap: 12,
  },
  title: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  empty: {
    flex: 1,
    gap: 8,
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  handle: {
    paddingTop: 8,
    paddingBottom: 12,
  },
  handleIndicator: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.grey[300],
  },
});
