import { type RefObject } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

import {
  useGetFeedMyProfileQuery,
  useGetMyProfileTopInfoQuery,
} from "@apis/feed";
import { useGetUncheckedNotificationExistsQuery } from "@apis/notification";
import { useGetMyIdQuery } from "@apis/user";
import { useDelayedLoading } from "@shared/hooks";
import {
  AppText,
  FeedPostPreview,
  FeedPostPreviewSkeleton,
  ListTotalCountHeader,
  ProfileTopSkeleton,
  ThipPreview,
  UserProfileBar,
} from "@shared/ui";
import { colors } from "@theme/token";

const MyFeedTopContents = () => {
  const { myId, isPendingMyId } = useGetMyIdQuery();
  const { myProfileTopInfo, isPendingMyProfileTopInfo } =
    useGetMyProfileTopInfoQuery();
  const isSkeletonVisible = useDelayedLoading(
    isPendingMyId || isPendingMyProfileTopInfo,
  );

  if (isSkeletonVisible) {
    return <ProfileTopSkeleton />;
  }

  if (isPendingMyId || isPendingMyProfileTopInfo) {
    return null;
  }

  if (!myId || !myProfileTopInfo) {
    return null;
  }

  return (
    <View style={styles.topContents}>
      <View style={styles.profile}>
        <UserProfileBar
          userProfile={{
            nickname: myProfileTopInfo.nickname,
            genre: myProfileTopInfo.aliasName,
            profileColor: myProfileTopInfo.aliasColor,
          }}
        />
        <ThipPreview
          userId={myId}
          followerCount={myProfileTopInfo.followerCount}
          thipList={myProfileTopInfo.latestFollowerProfileImageUrls}
        />
      </View>
      <ListTotalCountHeader length={myProfileTopInfo.totalFeedCount} />
    </View>
  );
};

interface MyFeedContentsProps {
  listRef: RefObject<FlatList | null>;
}

export default function MyFeedContents({ listRef }: MyFeedContentsProps) {
  const {
    feedMyProfileList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingFeedMyProfile,
    isErrorFeedMyProfile,
    refetchFeedMyProfile,
    isRefetchingFeedMyProfile,
  } = useGetFeedMyProfileQuery();
  const { refetchUncheckedNotificationExists } =
    useGetUncheckedNotificationExistsQuery();
  const isSkeletonVisible = useDelayedLoading(isPendingFeedMyProfile);

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const handleRefetch = () => {
    refetchFeedMyProfile();
    refetchUncheckedNotificationExists();
  };

  const renderEmpty = () => {
    if (isSkeletonVisible) {
      return <FeedPostPreviewSkeleton withHeader={false} />;
    }

    if (isPendingFeedMyProfile) {
      return null;
    }

    if (isErrorFeedMyProfile) {
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

  return (
    <FlatList
      ref={listRef}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<MyFeedTopContents />}
      data={feedMyProfileList}
      keyExtractor={(item) => String(item.feedId)}
      renderItem={({ item }) => <FeedPostPreview feedPreview={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={renderEmpty}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingFeedMyProfile}
          onRefresh={handleRefetch}
          tintColor={colors.white}
          colors={[colors.white]}
        />
      }
    />
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
  list: {
    paddingBottom: 100,
  },
  separator: {
    marginVertical: 40,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
  status: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
});
