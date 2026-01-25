import { Pressable, StyleSheet, View } from "react-native";

import {
  IcComment,
  IcHeartLeft,
  IcHeartLeftFilled,
  IcSave,
  IcSaveFilled,
} from "@images/icons";
import { colors } from "@theme/token";

import AppText from "../../../app-text";

interface FeedPostPreviewFooterProps {
  feedId: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isSaved: boolean;
}

export default function FeedPostPreviewFooter({
  feedId,
  likeCount,
  commentCount,
  isLiked,
  isSaved,
}: FeedPostPreviewFooterProps) {
  // TODO: 게시글 상세 페이지로 이동
  const handleToFeedDetail = () => {
    console.log(feedId, "번 게시글로 이동");
  };
  // TODO: 좋아요 누르기 api
  const handleClickHeart = () => {
    console.log(feedId, "번 게시글 좋아요");
  };
  // TODO: 저장 api
  const handleSaveFeed = () => {
    console.log(feedId, "번 게시글 저장");
  };

  return (
    <View style={styles.footer}>
      <View style={styles.likeCommentWrapper}>
        <View style={styles.likeCommentStyle}>
          <Pressable onPress={handleClickHeart}>
            {isLiked ? <IcHeartLeftFilled /> : <IcHeartLeft />}
          </Pressable>
          <AppText weight="medium" size="xs" color={colors.white}>
            {likeCount.toLocaleString()}
          </AppText>
        </View>
        <View style={styles.likeCommentStyle}>
          <Pressable onPress={handleToFeedDetail}>
            <IcComment />
          </Pressable>
          <AppText weight="medium" size="xs" color={colors.white}>
            {commentCount.toLocaleString()}
          </AppText>
        </View>
      </View>
      <Pressable onPress={handleSaveFeed}>
        {isSaved ? <IcSaveFilled /> : <IcSave />}
      </Pressable>
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
