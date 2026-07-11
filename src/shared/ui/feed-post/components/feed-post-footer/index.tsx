import { router } from "expo-router";
import { useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import {
  useChangeFeedLikeStatusMutation,
  useChangeFeedSaveStatusMutation,
} from "@apis/feed";
import {
  IcComment,
  IcHeartLeft,
  IcHeartLeftFilled,
  IcLock,
  IcSave,
  IcSaveFilled,
} from "@images/icons";
import { colors } from "@theme/token";

import AppText from "../../../app-text";
import {
  FeedMyPostPreviewType,
  FeedPostBase,
  FeedPostDetailType,
  FeedPostPreviewType,
} from "../../types";

interface FeedPostFooterProps {
  feed:
    | FeedPostPreviewType
    | FeedMyPostPreviewType
    | FeedPostDetailType
    | FeedPostBase;
  isDetailPage?: boolean;
}

export default function FeedPostFooter({
  feed,
  isDetailPage = false,
}: FeedPostFooterProps) {
  const { feedId, likeCount, commentCount, isLiked, isSaved, isWriter } = feed;
  const isChangingBookStatusRef = useRef(false);
  const { changeFeedSaveStatus, isPendingChangeFeedSaveStatus } =
    useChangeFeedSaveStatusMutation();
  const { changeFeedLikeStatus, isPendingChangeFeedLikeStatus } =
    useChangeFeedLikeStatusMutation();

  const handleToFeedDetail = () => {
    router.push({
      pathname: "/feed-detail/[feedId]",
      params: { feedId: String(feedId) },
    });
  };
  const handleClickHeart = () => {
    if (isPendingChangeFeedLikeStatus || isChangingBookStatusRef.current) {
      return null;
    }
    isChangingBookStatusRef.current = true;
    changeFeedLikeStatus(
      { feedId, type: !isLiked },
      { onSettled: () => (isChangingBookStatusRef.current = false) },
    );
  };

  const handleSaveFeed = () => {
    if (isPendingChangeFeedSaveStatus || isChangingBookStatusRef.current) {
      return null;
    }
    isChangingBookStatusRef.current = true;
    changeFeedSaveStatus(
      { feedId, type: !isSaved },
      { onSettled: () => (isChangingBookStatusRef.current = false) },
    );
  };

  return (
    <View style={styles.footer}>
      <View style={styles.likeCommentWrapper}>
        <View style={styles.likeCommentStyle}>
          <Pressable
            onPress={handleClickHeart}
            hitSlop={5}
            disabled={isPendingChangeFeedLikeStatus}
          >
            {isLiked ? <IcHeartLeftFilled /> : <IcHeartLeft />}
          </Pressable>
          <AppText weight="medium" size="xs" color={colors.white}>
            {likeCount.toLocaleString()}
          </AppText>
        </View>
        <View style={styles.likeCommentStyle}>
          <Pressable
            onPress={handleToFeedDetail}
            disabled={isDetailPage}
            hitSlop={5}
          >
            <IcComment />
          </Pressable>
          <AppText weight="medium" size="xs" color={colors.white}>
            {commentCount.toLocaleString()}
          </AppText>
        </View>
      </View>
      {isWriter ? (
        "isPublic" in feed && !feed.isPublic && <IcLock />
      ) : (
        <Pressable
          onPress={handleSaveFeed}
          disabled={isPendingChangeFeedSaveStatus}
          hitSlop={5}
        >
          {isSaved ? <IcSaveFilled /> : <IcSave />}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likeCommentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  likeCommentStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
