import { StyleSheet, View } from "react-native";

import { ListTotalCountHeader, ThipPreview, UserProfileBar } from "@shared/ui";

interface UserProfileTopContentsProps {
  isThipped: boolean;
  userProfile: {
    nickname: string;
    aliasName: string;
    aliasColor: string;
  };
  followerCount: number;
  thipList: string[];
  totalFeedCount: number;
  handlePressThip: () => void;
}

export default function UserProfileTopContents({
  isThipped,
  userProfile,
  followerCount,
  thipList,
  totalFeedCount,
  handlePressThip,
}: UserProfileTopContentsProps) {
  return (
    <View style={styles.topContents}>
      <View style={styles.profile}>
        <UserProfileBar
          type="thip"
          isThipped={isThipped}
          userProfile={{
            nickname: userProfile.nickname,
            genre: userProfile.aliasName,
            profileColor: userProfile.aliasColor,
          }}
          handlePressThip={handlePressThip}
        />
        <ThipPreview followerCount={followerCount} thipList={thipList} />
      </View>
      <ListTotalCountHeader length={totalFeedCount} />
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
