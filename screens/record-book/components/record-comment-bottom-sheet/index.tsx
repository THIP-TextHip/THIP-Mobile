import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  useGetCommentListQuery,
  useWriteCommentMutation,
  type CommentType,
} from "@apis/comment";
import { type RoomPostType } from "@apis/room";
import { ROOM_POST_QUERY_KEY } from "@apis/room-post";
import { useKeyboardHeight } from "@shared/hooks";
import { AppText, ChatInputBar, CommentRoot } from "@shared/ui";
import { colors } from "@theme/token";

interface RecordCommentBottomSheetProps {
  roomId: number | string;
  postId: number;
  postType: RoomPostType;
  isVisible: boolean;
  handleClose: () => void;
}

export default function RecordCommentBottomSheet({
  roomId,
  postId,
  postType,
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

  const queryClient = useQueryClient();
  const {
    commentList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingCommentList,
    isErrorCommentList,
    commentListError,
  } = useGetCommentListQuery(postId, postType);
  const { writeComment, isPendingWriteComment } = useWriteCommentMutation();

  const handleLoadMoreComments = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const listPaddingBottom =
    (replyNickname !== "" ? 30 : 0) +
    (isInputFocus ? keyboardHeight + bottom : bottom);

  const handleSendText = () => {
    const content = comment.trim();

    writeComment(
      {
        postId,
        content,
        isReplyRequest: replyCommentId !== null,
        parentId: replyCommentId,
        postType,
      },
      {
        onSuccess: () => {
          setComment("");
          handleResetReply();
          queryClient.invalidateQueries({
            queryKey: ROOM_POST_QUERY_KEY.ALL_POST(roomId),
          });
        },
      },
    );
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
            data={commentList}
            keyExtractor={(item: CommentType) => String(item.commentId)}
            renderItem={({ item }: { item: CommentType }) => (
              <CommentRoot
                postId={postId}
                postType="RECORD"
                comment={item}
                handlePressReply={handlePressReply}
              />
            )}
            ListEmptyComponent={() =>
              isPendingCommentList ? (
                <View style={styles.status}>
                  <ActivityIndicator size="large" color={colors.white} />
                </View>
              ) : isErrorCommentList ? (
                <View style={styles.status}>
                  <AppText weight="semibold" size="lg" color={colors.white}>
                    댓글을 불러오지 못했어요. ({commentListError?.message})
                  </AppText>
                </View>
              ) : (
                <View style={styles.status}>
                  <AppText weight="semibold" size="lg" color={colors.white}>
                    아직 댓글이 없어요
                  </AppText>
                  <AppText weight="regular" size="sm" color={colors.grey[100]}>
                    첫번째 댓글을 남겨보세요
                  </AppText>
                </View>
              )
            }
            onEndReached={handleLoadMoreComments}
            onEndReachedThreshold={0.5}
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
          isPendingSend={isPendingCommentList || isPendingWriteComment}
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
    minHeight: 300,
    gap: 12,
  },
  title: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  status: {
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
