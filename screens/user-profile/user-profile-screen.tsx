import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import {
  FeedPostPreview,
  ListTotalCountHeader,
  ThipPreview,
  UserProfileBar,
} from "@shared/ui";
import { colors } from "@theme/token";

// TODO: 추후 서버에서 가져올 데이터
import { UserProfileFeedEmpty } from "./components";
import {
  DUMMY_USER_PROFILE_FEEDS,
  DUMMY_USER_PROFILE_TOP_VIEW,
} from "./constants";

export default function UserProfileScreen() {
  const { bottom } = useSafeAreaInsets();
  const { userId } = useLocalSearchParams<{ userId: string }>();

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

  const UserProfileTopContents = () => {
    return (
      <View style={styles.topContents}>
        <View style={styles.profile}>
          <UserProfileBar
            userProfile={{
              nickname: DUMMY_USER_PROFILE_TOP_VIEW.nickname,
              genre: DUMMY_USER_PROFILE_TOP_VIEW.aliasName,
              profileColor: DUMMY_USER_PROFILE_TOP_VIEW.aliasColor,
            }}
          />
          <ThipPreview
            followerCount={DUMMY_USER_PROFILE_TOP_VIEW.followerCount}
            thipList={
              DUMMY_USER_PROFILE_TOP_VIEW.latestFollowerProfileImageUrls
            }
          />
        </View>
        <ListTotalCountHeader
          length={DUMMY_USER_PROFILE_TOP_VIEW.totalFeedCount}
        />
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: bottom + 60 }}
      ListHeaderComponent={() => <UserProfileTopContents />}
      data={DUMMY_USER_PROFILE_FEEDS}
      keyExtractor={(item) => String(item.feedId)}
      renderItem={({ item }) => <FeedPostPreview feedPreview={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={() => <UserProfileFeedEmpty />}
    />
  );
}

const styles = StyleSheet.create({
  topContents: {
    flex: 1,
    marginTop: 32,
    marginBottom: 20,
  },
  profile: {
    gap: 16,
    paddingHorizontal: 20,
    marginBottom: 40,
  },

  separator: {
    marginVertical: 40,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
});
