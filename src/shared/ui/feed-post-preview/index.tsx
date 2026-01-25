import { StyleSheet, View } from "react-native";

import BookInfoBar from "../book-info-bar";

import {
  FeedPostPreviewBody,
  FeedPostPreviewFooter,
  FeedPostPreviewHeader,
} from "./components";
import { FeedPostPreviewType } from "./types";

interface FeedPostPreviewProps {
  feedPreview: FeedPostPreviewType;
}

export default function FeedPostPreview({ feedPreview }: FeedPostPreviewProps) {
  const {
    feedId,
    creatorId,
    creatorNickname,
    creatorProfileImageUrl,
    aliasName,
    aliasColor,
    postDate,
    isbn,
    bookTitle,
    bookAuthor,
    contentBody,
    contentUrls,
    likeCount,
    commentCount,
    isSaved,
    isLiked,
  } = feedPreview;

  return (
    <View style={styles.container}>
      <FeedPostPreviewHeader
        creatorId={creatorId}
        creatorProfileImageUrl={creatorProfileImageUrl}
        creatorNickname={creatorNickname}
        aliasName={aliasName}
        aliasColor={aliasColor}
        postDate={postDate}
      />
      <BookInfoBar isbn={isbn} bookTitle={bookTitle} bookAuthor={bookAuthor} />
      <FeedPostPreviewBody
        feedId={feedId}
        contentBody={contentBody}
        contentUrls={contentUrls}
      />
      <FeedPostPreviewFooter
        feedId={feedId}
        likeCount={likeCount}
        commentCount={commentCount}
        isLiked={isLiked}
        isSaved={isSaved}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 16,
  },
});
