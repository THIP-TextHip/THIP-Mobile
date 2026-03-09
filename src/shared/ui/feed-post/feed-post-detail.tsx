import { colors } from "@/src/theme/token";
import { StyleSheet, View } from "react-native";
import BookInfoBar from "../book-info-bar";
import {
  FeedPostDetailBody,
  FeedPostFooter,
  FeedPostHeader,
} from "./components";
import { FeedPostDetailType } from "./types";

interface FeedPostDetailProps {
  feedDetail: FeedPostDetailType;
}

export default function FeedPostDetail({ feedDetail }: FeedPostDetailProps) {
  return (
    <View style={styles.container}>
      <FeedPostHeader feed={feedDetail} />
      <BookInfoBar
        isbn={feedDetail.isbn}
        bookTitle={feedDetail.bookTitle}
        bookAuthor={feedDetail.bookAuthor}
      />
      <FeedPostDetailBody feedDetail={feedDetail} />
      <FeedPostFooter feed={feedDetail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 30,
    gap: 16,
    borderBottomWidth: 6,
    borderBottomColor: colors.darkgrey.divider,
  },
});
