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

import {
  useGetFeedUserProfileQuery,
  useGetUserProfileTopInfoQuery,
} from "@apis/feed";
import { AppText, FeedPostPreview } from "@shared/ui";
import { colors } from "@theme/token";

import { UserProfileTopContents } from "./components";

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
  const { userProfileTopInfo, isPendingUserProfileTopInfo } =
    useGetUserProfileTopInfoQuery(Number(userId));

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const renderHeader = useCallback(
    () => <UserProfileTopContents userProfileTopInfo={userProfileTopInfo} />,
    [userProfileTopInfo],
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

  if (isPendingUserProfileTopInfo) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
});
