import { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  useChangeUserBlockStatusMutation,
  useGetBlockedUserQuery,
} from "@apis/user";
import { useDelayedLoading } from "@shared/hooks";
import {
  AppText,
  ListTotalCountHeader,
  LoadingOverlay,
  UserListItemSkeleton,
} from "@shared/ui";
import { colors } from "@theme/token";

import { BlockedUserItem, UnblockUserModal } from "./components";

export default function BlockedUserListScreen() {
  const { bottom } = useSafeAreaInsets();
  const [targetUserId, setTargetUserId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    blockedUserList,
    totalBlockedUserCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingBlockedUsers,
    refetchBlockedUsers,
    isRefetchingBlockedUsers,
  } = useGetBlockedUserQuery();
  const { changeUserBlockStatus, isPendingChangeUserBlockStatus } =
    useChangeUserBlockStatusMutation();
  const isSkeletonVisible = useDelayedLoading(isPendingBlockedUsers);

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const handleOpenModal = (userId: number) => {
    setTargetUserId(userId);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setTargetUserId(null);
    setIsModalVisible(false);
  };

  const handleUnlockUser = () => {
    if (!targetUserId || isPendingChangeUserBlockStatus) return;

    changeUserBlockStatus(
      { targetUserId, type: false },
      {
        onSettled: () => {
          setTargetUserId(null);
          setIsModalVisible(false);
        },
      },
    );
  };

  const renderEmpty = () => {
    return (
      <View style={styles.status}>
        <AppText weight="medium" size="sm" color={colors.grey[200]}>
          차단한 사용자가 없어요.
        </AppText>
      </View>
    );
  };

  if (isSkeletonVisible) {
    return <UserListItemSkeleton />;
  }

  if (isPendingBlockedUsers) {
    return null;
  }

  return (
    <View style={styles.page}>
      <ListTotalCountHeader length={totalBlockedUserCount} />
      <FlatList
        contentContainerStyle={[styles.list, { paddingBottom: bottom + 20 }]}
        data={blockedUserList}
        keyExtractor={(item) => String(item.userId)}
        renderItem={({ item }) => {
          return (
            <BlockedUserItem
              userId={item.userId}
              profileImage={item.profileImageUrl}
              nickname={item.nickname}
              aliasName={item.aliasName}
              aliasColor={item.aliasColor}
              handleOpenModal={() => handleOpenModal(item.userId)}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmpty}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingBlockedUsers}
            onRefresh={refetchBlockedUsers}
            tintColor={colors.white}
            colors={[colors.white]}
          />
        }
      />
      <UnblockUserModal
        isVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
        handleUnblock={() => handleUnlockUser()}
      />
      <LoadingOverlay
        visible={isPendingChangeUserBlockStatus}
        label="유저를 차단하는 중이에요"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: 20,
  },
  entireCount: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkgrey.dark,
    marginHorizontal: 20,
  },
  list: {
    padding: 20,
    gap: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkgrey.dark,
    marginTop: 20,
  },
  status: {
    flex: 1,
    paddingVertical: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
