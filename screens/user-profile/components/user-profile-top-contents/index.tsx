import { StyleSheet, View } from "react-native";

import { GetUserProfileTopInfoResponse } from "@apis/feed";
import { useChangeFollowingStateMutation } from "@apis/user";
import { ListTotalCountHeader, ThipPreview, UserProfileBar } from "@shared/ui";

interface UserProfileTopContentsProps {
  userProfileTopInfo: GetUserProfileTopInfoResponse | undefined;
}

export default function UserProfileTopContents({
  userProfileTopInfo,
}: UserProfileTopContentsProps) {
  const { changeFollowingState, isPendingChangeFollowingState } =
    useChangeFollowingStateMutation();

  const handlePressThip = () => {
    if (!userProfileTopInfo || isPendingChangeFollowingState) return null;
    changeFollowingState({
      followingUserId: userProfileTopInfo.creatorId,
      type: !userProfileTopInfo.isFollowing,
    });
  };

  if (!userProfileTopInfo) return null;

  return (
    <View style={styles.topContents}>
      <View style={styles.profile}>
        <UserProfileBar
          type="thip"
          isFollowing={userProfileTopInfo.isFollowing}
          userProfile={{
            nickname: userProfileTopInfo.nickname,
            genre: userProfileTopInfo.aliasName,
            profileColor: userProfileTopInfo.aliasColor,
          }}
          handlePressThip={handlePressThip}
        />
        <ThipPreview
          userId={userProfileTopInfo.creatorId}
          followerCount={userProfileTopInfo.followerCount}
          thipList={userProfileTopInfo.latestFollowerProfileImageUrls}
        />
      </View>
      <ListTotalCountHeader length={userProfileTopInfo.totalFeedCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  topContents: {
    marginTop: 32,
    marginBottom: 20,
  },
  profile: {
    gap: 16,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
});
