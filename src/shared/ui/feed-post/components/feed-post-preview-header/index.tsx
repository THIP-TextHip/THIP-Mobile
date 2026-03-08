import { Pressable, StyleSheet, View } from "react-native";

import { colors } from "@theme/token";

import AppText from "../../../app-text";
import ProfileImage from "../../../profile-image";
import { FeedPostPreviewType } from "../../types";

interface FeedPostPreviewHeaderProps {
  feedPreview: FeedPostPreviewType;
}

export default function FeedPostPreviewHeader({
  feedPreview,
}: FeedPostPreviewHeaderProps) {
  const {
    creatorId,
    creatorProfileImageUrl,
    creatorNickname,
    aliasName,
    aliasColor,
    postDate,
  } = feedPreview;

  // TODO: 유저 피드 페이지로 이동
  const handleToUserFeed = () => {
    console.log(creatorId, "번 유저 피드 페이지로 이동");
  };
  return (
    <Pressable style={styles.header} onPress={handleToUserFeed}>
      <View style={styles.profile}>
        <ProfileImage image={creatorProfileImageUrl} />
        <View style={styles.creatorInfo}>
          <AppText weight="medium" size="sm" color={colors.white}>
            {creatorNickname}
          </AppText>
          <AppText weight="regular" size="xs" color={aliasColor}>
            {aliasName}
          </AppText>
        </View>
      </View>
      <AppText weight="regular" size="2xs" color={colors.grey[200]}>
        {postDate}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  creatorInfo: {
    gap: 4,
  },
});
