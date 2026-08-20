import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import {
  useGetFeedUserProfileQuery,
  useGetUserProfileTopInfoQuery,
} from "@apis/feed";
import { useChangeUserBlockStatusMutation } from "@apis/user";
import { useDelayedLoading } from "@shared/hooks";
import {
  AppText,
  FeedPostPreview,
  FeedPostPreviewSkeleton,
  LoadingOverlay,
  ProfileTopSkeleton,
} from "@shared/ui";
import { colors } from "@theme/token";

import { UserProfileHeader, UserProfileTopContents } from "./components";
import UserBlockBottomSheet from "./components/user-block-bottom-sheet";
import UserBlockModal from "./components/user-block-modal";

export default function UserProfileScreen() {
  const { bottom } = useSafeAreaInsets();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
  const { changeUserBlockStatus, isPendingChangeUserBlockStatus } =
    useChangeUserBlockStatusMutation();

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const isProfileSkeletonVisible = useDelayedLoading(
    isPendingUserProfileTopInfo,
  );
  const isFeedSkeletonVisible = useDelayedLoading(isPendingFeedUserProfile);

  const handlePressMore = () => {
    if (!userId) return;

    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const handleOpenModal = () => {
    setIsBottomSheetVisible(false);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleBlockUser = () => {
    if (isPendingChangeUserBlockStatus) return;
    changeUserBlockStatus(
      { targetUserId: userId, type: true },
      { onSettled: () => setIsModalVisible(false) },
    );
  };

  const renderHeader = useCallback(() => {
    if (isProfileSkeletonVisible) {
      return <ProfileTopSkeleton />;
    }

    if (isPendingUserProfileTopInfo) {
      return null;
    }

    return <UserProfileTopContents userProfileTopInfo={userProfileTopInfo} />;
  }, [
    isPendingUserProfileTopInfo,
    isProfileSkeletonVisible,
    userProfileTopInfo,
  ]);

  const renderEmpty = () => {
    if (isFeedSkeletonVisible) {
      return <FeedPostPreviewSkeleton withHeader={false} />;
    }

    if (isPendingFeedUserProfile) {
      return null;
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
    <>
      <UserProfileHeader handlePressMore={handlePressMore} />
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
      <UserBlockBottomSheet
        isVisible={isBottomSheetVisible}
        handleCloseBottomSheet={handleCloseBottomSheet}
        handleOpenModal={handleOpenModal}
      />
      <UserBlockModal
        isVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
        handleBlock={handleBlockUser}
      />
      <LoadingOverlay
        visible={isPendingChangeUserBlockStatus}
        label="유저를 차단하는 중이에요"
      />
    </>
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
