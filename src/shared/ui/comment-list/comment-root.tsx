import { FlatList, StyleSheet, View } from "react-native";

import { type CommentPostType, type CommentType } from "@apis/comment";

import CommentItem from "./comment-item";

interface CommentRootProps {
  postId: number | string;
  postType?: CommentPostType;
  comment: CommentType;
  handlePressReply: (commentId: number, replyNickname: string) => void;
}

export default function CommentRoot({
  postId,
  postType = "FEED",
  comment,
  handlePressReply,
}: CommentRootProps) {
  return (
    <View style={[styles.container, { gap: postType === "FEED" ? 24 : 20 }]}>
      <CommentItem
        postId={postId}
        postType={postType}
        comment={comment}
        handlePressReply={handlePressReply}
      />
      {comment.replyList.length !== 0 && (
        <FlatList
          data={comment.replyList}
          style={styles.replyList}
          renderItem={({ item }) => (
            <CommentItem
              postId={postId}
              postType={postType}
              comment={item}
              handlePressReply={handlePressReply}
            />
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
