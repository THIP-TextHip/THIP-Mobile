import { StyleSheet, View } from "react-native";

import { GetUserProfileTopInfoResponse } from "@apis/feed";
import { ListTotalCountHeader, ThipPreview, UserProfileBar } from "@shared/ui";

interface UserProfileTopContentsProps {
  userProfileTopInfo: GetUserProfileTopInfoResponse | undefined;
}

export default function UserProfileTopContents({
  userProfileTopInfo,
}: UserProfileTopContentsProps) {
  // TODO: 팔로잉 상태 변경 api 연동

  const handlePressThip = () => {
    console.log(userProfileTopInfo?.creatorId, "번 유저 띱하기");
  };

  if (!userProfileTopInfo) return null;

  return (
    <View style={styles.topContents}>
      <View style={styles.profile}>
        <UserProfileBar
          type="thip"
          isThipped={userProfileTopInfo.isFollowing}
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
