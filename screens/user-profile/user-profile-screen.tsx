import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { useGetFeedUserProfileQuery } from "@apis/feed";
import { AppText, FeedPostPreview } from "@shared/ui";
import { colors } from "@theme/token";

// TODO: 추후 서버에서 가져올 데이터
import { UserProfileTopContents } from "./components";
import { DUMMY_USER_PROFILE_TOP_VIEW } from "./constants";

export default function UserProfileScreen() {
  const { bottom } = useSafeAreaInsets();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const {
    feedUserProfileList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingFeedUserProfile,
    isErrorFeedUserProfile,
    refetchFeedUserProfile,
    isRefetchingFeedUserProfile,
  } = useGetFeedUserProfileQuery(Number(userId));

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

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

  const renderEmpty = () => {
    if (isPendingFeedUserProfile) {
      return (
        <View style={styles.status}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      );
    }

    if (isErrorFeedUserProfile) {
      return (
        <View style={styles.status}>
          <AppText weight="medium" size="sm" color={colors.grey[200]}>
            피드를 불러오지 못했어요.
          </AppText>
        </View>
      );
    }

    return (
      <View style={styles.status}>
        <AppText weight="semibold" size="lg" color={colors.white}>
          피드에 작성된 글이 없어요.
        </AppText>
      </View>
    );
  };

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
      data={feedUserProfileList}
      keyExtractor={(item) => String(item.feedId)}
      renderItem={({ item }) => <FeedPostPreview feedPreview={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={renderEmpty}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingFeedUserProfile}
          onRefresh={refetchFeedUserProfile}
          tintColor={colors.white}
          colors={[colors.white]}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 40,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
  status: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
});
