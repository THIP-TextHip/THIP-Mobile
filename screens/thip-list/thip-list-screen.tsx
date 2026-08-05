import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FollowerType, useGetUserFollowersQuery } from "@apis/user";
import { useDelayedLoading } from "@shared/hooks";
import {
  AppText,
  ListTotalCountHeader,
  UserListItem,
  UserListItemSkeleton,
} from "@shared/ui";
import { colors } from "@theme/token";

export default function ThipListScreen() {
  const { bottom } = useSafeAreaInsets();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const {
    followerList,
    totalFollowerCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingUserFollowers,
    refetchUserFollowers,
    isRefetchingUserFollowers,
  } = useGetUserFollowersQuery(Number(userId));

  const isSkeletonVisible = useDelayedLoading(isPendingUserFollowers);

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const listItem = useCallback(
    ({ item }: { item: FollowerType }) => <UserListItem userData={item} />,
    [],
  );

  const Separator = () => <View style={styles.separator} />;

  const renderEmpty = () => {
    return (
      <View style={styles.status}>
        <AppText weight="medium" size="sm" color={colors.grey[200]}>
          아직 띱한 사용자가 없어요.
        </AppText>
      </View>
    );
  };

  if (isSkeletonVisible) {
    return <UserListItemSkeleton containerStyle={styles.list} />;
  }

  if (isPendingUserFollowers) {
    return null;
  }

  return (
    <FlatList
      contentContainerStyle={[styles.list, { paddingBottom: bottom + 20 }]}
      ListHeaderComponent={() => (
        <ListTotalCountHeader length={totalFollowerCount} />
      )}
      data={followerList}
      keyExtractor={(item) => String(item.userId)}
      renderItem={listItem}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={renderEmpty}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingUserFollowers}
          onRefresh={refetchUserFollowers}
          tintColor={colors.white}
          colors={[colors.white]}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkgrey.dark,
    marginHorizontal: 20,
  },
  status: {
    flex: 1,
    paddingVertical: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
