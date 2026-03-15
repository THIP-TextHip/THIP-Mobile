import { StyleSheet, View } from "react-native";

import BookInfoBar from "../book-info-bar";
import {
  FeedPostFooter,
  FeedPostHeader,
  FeedPostPreviewBody,
} from "./components";
import {
  FeedMyPostPreviewType,
  FeedPostBase,
  FeedPostPreviewType,
} from "./types";

interface FeedPostPreviewProps {
  feedPreview: FeedPostBase | FeedPostPreviewType | FeedMyPostPreviewType;
}

export default function FeedPostPreview({ feedPreview }: FeedPostPreviewProps) {
  return (
    <View style={styles.container}>
      {"creatorId" in feedPreview && <FeedPostHeader feed={feedPreview} />}
      <BookInfoBar
        isbn={feedPreview.isbn}
        bookTitle={feedPreview.bookTitle}
        bookAuthor={feedPreview.bookAuthor}
      />
      <FeedPostPreviewBody feedPreview={feedPreview} />
      <FeedPostFooter feed={feedPreview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 16,
  },
});
