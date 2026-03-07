import { Pressable, StyleSheet, View } from "react-native";

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
import { FeedMyPostPreviewType, FeedPostPreviewType } from "../../types";

interface FeedPostPreviewFooterProps {
  feedPreview: FeedPostPreviewType | FeedMyPostPreviewType;
}

export default function FeedPostPreviewFooter({
  feedPreview,
}: FeedPostPreviewFooterProps) {
  // TODO: 게시글 상세 페이지로 이동
  const handleToFeedDetail = () => {
    console.log(feedPreview.feedId, "번 게시글로 이동");
  };
  // TODO: 좋아요 누르기 api
  const handleClickHeart = () => {
    console.log(feedPreview.feedId, "번 게시글 좋아요");
  };
  // TODO: 저장 api
  const handleSaveFeed = () => {
    console.log(feedPreview.feedId, "번 게시글 저장");
  };

  return (
    <View style={styles.footer}>
      <View style={styles.likeCommentWrapper}>
        <View style={styles.likeCommentStyle}>
          <Pressable onPress={handleClickHeart}>
            {feedPreview.isLiked ? <IcHeartLeftFilled /> : <IcHeartLeft />}
          </Pressable>
          <AppText weight="medium" size="xs" color={colors.white}>
            {feedPreview.likeCount.toLocaleString()}
          </AppText>
        </View>
        <View style={styles.likeCommentStyle}>
          <Pressable onPress={handleToFeedDetail}>
            <IcComment />
          </Pressable>
          <AppText weight="medium" size="xs" color={colors.white}>
            {feedPreview.commentCount.toLocaleString()}
          </AppText>
        </View>
      </View>
      {feedPreview.isWriter ? (
        "isPublic" in feedPreview && !feedPreview.isPublic && <IcLock />
      ) : (
        <Pressable onPress={handleSaveFeed}>
          {feedPreview.isSaved ? <IcSaveFilled /> : <IcSave />}
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
