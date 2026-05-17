import { useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";

import {
  AppText,
  ChatInputBar,
  CommentRoot,
  CustomBottomSheet,
} from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_RECORD_COMMENT_LIST } from "../../constants";

interface RecordCommentProps {
  isVisible: boolean;
  handleClose: () => void;
}

export default function RecordComment({
  isVisible,
  handleClose,
}: RecordCommentProps) {
  const { height } = useWindowDimensions();
  const [inputBarHeight, setInputBarHeight] = useState(0);

  const [comment, setComment] = useState("");
  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  const [replyNickname, setReplyNickname] = useState("");

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
  };

  return (
    <CustomBottomSheet
      containerStyle={[styles.container, { height: height * 0.7 }]}
      isVisible={isVisible}
      handleClose={handleClose}
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
      <FlatList
        contentContainerStyle={[
          styles.list,
          {
            paddingBottom: inputBarHeight,
          },
        ]}
        data={DUMMY_RECORD_COMMENT_LIST}
        keyExtractor={(item) => String(item.commentId)}
        renderItem={({ item, index }) => (
          <CommentRoot
            type="record"
            comment={item}
            isFirst={index === 0}
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

      <ChatInputBar
        text={comment}
        placeholder="여러분의 생각을 남겨주세요."
        setText={setComment}
        handleSend={handleSendText}
        targetName={replyNickname}
        handleResetReply={handleResetReply}
        onLayout={(event) => {
          setInputBarHeight(event.nativeEvent.layout.height);
        }}
      />
    </CustomBottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 20,
  },
  container: {
    gap: 20,
    paddingHorizontal: 0,
  },
  page: {
    flex: 1,
  },
  list: {
    gap: 20,
  },
  empty: {
    flex: 1,
    gap: 8,
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center",
  },
});
