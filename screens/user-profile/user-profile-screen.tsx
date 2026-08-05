import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect } from "react";
import {
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
import { useDelayedLoading } from "@shared/hooks";
import {
  AppText,
  FeedPostPreview,
  FeedPostPreviewSkeleton,
  ProfileTopSkeleton,
} from "@shared/ui";
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

  const isProfileSkeletonVisible = useDelayedLoading(
    isPendingUserProfileTopInfo,
  );
  const isFeedSkeletonVisible = useDelayedLoading(isPendingFeedUserProfile);

  // 상단 정보와 피드 목록은 별도 쿼리라, 상단 로딩이 화면 전체를 막지 않도록
  // 헤더 안에서만 스켈레톤을 보여준다.
  const renderHeader = useCallback(() => {
    if (isPendingUserProfileTopInfo) {
      return isProfileSkeletonVisible ? <ProfileTopSkeleton /> : null;
    }

    return <UserProfileTopContents userProfileTopInfo={userProfileTopInfo} />;
  }, [
    isPendingUserProfileTopInfo,
    isProfileSkeletonVisible,
    userProfileTopInfo,
  ]);

  const renderEmpty = () => {
    if (isPendingFeedUserProfile) {
      return isFeedSkeletonVisible ? (
        <FeedPostPreviewSkeleton withHeader={false} />
      ) : null;
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
