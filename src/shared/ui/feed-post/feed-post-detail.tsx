import { StyleSheet, View } from "react-native";

import { colors } from "@theme/token";

import BookInfoBar from "../book-info-bar";
import {
  FeedPostDetailBody,
  FeedPostFooter,
  FeedPostHeader,
} from "./components";
import { FeedPostDetailType } from "./types";

interface FeedPostDetailProps {
  feedDetail: FeedPostDetailType;
  handleOpenImageView: (index: number) => void;
}

export default function FeedPostDetail({
  feedDetail,
  handleOpenImageView,
}: FeedPostDetailProps) {
  return (
    <View style={styles.container}>
      <FeedPostHeader feed={feedDetail} />
      <BookInfoBar
        isbn={feedDetail.isbn}
        bookTitle={feedDetail.bookTitle}
        bookAuthor={feedDetail.bookAuthor}
      />
      <FeedPostDetailBody
        feedDetail={feedDetail}
        handleOpenImageView={handleOpenImageView}
      />
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
