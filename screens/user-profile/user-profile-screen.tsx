import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { FeedPostPreview } from "@shared/ui";
import { colors } from "@theme/token";

// TODO: 추후 서버에서 가져올 데이터
import { UserProfileFeedEmpty, UserProfileTopContents } from "./components";
import {
  DUMMY_USER_PROFILE_FEEDS,
  DUMMY_USER_PROFILE_TOP_VIEW,
} from "./constants";

export default function UserProfileScreen() {
  const { bottom } = useSafeAreaInsets();
  const { userId } = useLocalSearchParams<{ userId: string }>();

  const handlePressThip = useCallback(() => {
    console.log(DUMMY_USER_PROFILE_TOP_VIEW.creatorId, "번 유저 띱하기");
  }, []);

  const renderHeader = useCallback(
    () => (
      <UserProfileTopContents
        creatorId={DUMMY_USER_PROFILE_TOP_VIEW.creatorId}
        isThipped={DUMMY_USER_PROFILE_TOP_VIEW.isFollowing}
        userProfile={{
          nickname: DUMMY_USER_PROFILE_TOP_VIEW.nickname,
          aliasName: DUMMY_USER_PROFILE_TOP_VIEW.aliasName,
          aliasColor: DUMMY_USER_PROFILE_TOP_VIEW.aliasColor,
        }}
        followerCount={DUMMY_USER_PROFILE_TOP_VIEW.followerCount}
        thipList={DUMMY_USER_PROFILE_TOP_VIEW.latestFollowerProfileImageUrls}
        totalFeedCount={DUMMY_USER_PROFILE_TOP_VIEW.totalFeedCount}
        handlePressThip={handlePressThip}
      />
    ),
    [handlePressThip],
  );

  useEffect(() => {
    if (!userId) {
      Toast.show({
        type: "error",
        text1: "해당 유저의 프로필이 존재하지 않습니다.",
      });
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/feed");
      }
    }
  }, [userId]);

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: bottom + 60 }}
      ListHeaderComponent={renderHeader}
      data={DUMMY_USER_PROFILE_FEEDS}
      keyExtractor={(item) => String(item.feedId)}
      renderItem={({ item }) => <FeedPostPreview feedPreview={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={() => <UserProfileFeedEmpty />}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 40,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
});
