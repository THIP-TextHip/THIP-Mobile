import { StyleSheet, View } from "react-native";

import BookInfoBar from "../book-info-bar";
import {
  FeedPostPreviewBody,
  FeedPostPreviewFooter,
  FeedPostPreviewHeader,
} from "./components";
import { FeedMyPostPreviewType, FeedPostPreviewType } from "./types";

interface FeedPostPreviewProps {
  feedPreview: FeedPostPreviewType | FeedMyPostPreviewType;
}

export default function FeedPostPreview({ feedPreview }: FeedPostPreviewProps) {
  return (
    <View style={styles.container}>
      {"creatorId" in feedPreview && (
        <FeedPostPreviewHeader feedPreview={feedPreview} />
      )}
      <BookInfoBar
        isbn={feedPreview.isbn}
        bookTitle={feedPreview.bookTitle}
        bookAuthor={feedPreview.bookAuthor}
      />
      <FeedPostPreviewBody feedPreview={feedPreview} />
      <FeedPostPreviewFooter feedPreview={feedPreview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 16,
  },
});
