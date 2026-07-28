import { Pressable, StyleSheet, View } from "react-native";

import { type RoomPostType } from "@apis/room";
import {
  IcComment,
  IcHeartLeft,
  IcHeartLeftFilled,
  IcPin,
} from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface RecordPostActionsProps {
  postId: number;
  isLiked: boolean;
  isWriter: boolean;
  postType: RoomPostType;
  likeCount: number;
  commentCount: number;
  handlePressLike: (isLiked: boolean) => void;
  handleOpenComment: (postId: number) => void;
  handleOpenPinModal: () => void;
}

export default function RecordPostActions({
  postId,
  isLiked,
  isWriter,
  postType,
  likeCount,
  commentCount,
  handlePressLike,
  handleOpenComment,
  handleOpenPinModal,
}: RecordPostActionsProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.likeComment}
        onPress={() => handlePressLike(isLiked)}
        hitSlop={5}
      >
        {isLiked ? <IcHeartLeftFilled /> : <IcHeartLeft />}
        <AppText weight="medium" size="xs" color={colors.white}>
          {likeCount}
        </AppText>
      </Pressable>
      <Pressable
        style={styles.likeComment}
        onPress={() => handleOpenComment(postId)}
        hitSlop={5}
      >
        <IcComment />
        <AppText weight="medium" size="xs" color={colors.white}>
          {commentCount}
        </AppText>
      </Pressable>
      {isWriter && postType === "RECORD" && (
        <Pressable onPress={handleOpenPinModal} hitSlop={5}>
          <IcPin />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  likeComment: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
});
