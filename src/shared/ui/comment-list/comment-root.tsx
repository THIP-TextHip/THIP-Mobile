import { FlatList, StyleSheet, View } from "react-native";

import CommentItem from "./comment-item";
import { CommentListType } from "./types";

interface CommentRootProps {
  type?: "feed" | "record";
  comment: CommentListType;
  isFirst: boolean;
  handlePressReply: (commentId: number, replyNickname: string) => void;
}

export default function CommentRoot({
  type = "feed",
  comment,
  isFirst,
  handlePressReply,
}: CommentRootProps) {
  return (
    <View
      style={[
        styles.container,
        { gap: type === "feed" ? 24 : 20 },
        isFirst && type !== "record" && { paddingTop: 40 },
      ]}
    >
      <CommentItem comment={comment} handlePressReply={handlePressReply} />
      {comment.replyList.length !== 0 && (
        <FlatList
          data={comment.replyList}
          style={styles.replyList}
          renderItem={({ item }) => (
            <CommentItem comment={item} handlePressReply={handlePressReply} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  content: {
    gap: 12,
  },
  replyList: {
    gap: 24,
  },
});
