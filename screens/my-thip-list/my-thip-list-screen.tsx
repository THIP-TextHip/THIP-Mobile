import { useState } from "react";
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
  useChangeFollowingStateMutation,
  useGetMyFollowingsQuery,
} from "@apis/user";
import { AppText, ListTotalCountHeader } from "@shared/ui";
import { colors } from "@theme/token";

import { MyThipItem } from "./components";

export default function MyThipListScreen() {
  const { bottom } = useSafeAreaInsets();
  const {
    myFollowingList,
    totalFollowingCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingMyFollowings,
    refetchMyFollowings,
    isRefetchingMyFollowings,
  } = useGetMyFollowingsQuery();
  const { changeFollowingState, isPendingChangeFollowingState } =
    useChangeFollowingStateMutation();
  // 각 데이터의 isFollowing을 저장하는 상태.
  const [isFollowingOverrides, setIsFollowingOverrides] = useState<
    Record<number, boolean>
  >({});

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const handleRefresh = async () => {
    setIsFollowingOverrides({});
    await refetchMyFollowings();
  };

  // TODO: 화면에 잘 반영되는지 추후 띱 목록이 생긴 경우 테스트
  const handleChangeFollowingState = (
    followingUserId: number,
    nickname: string,
    isFollowing: boolean,
  ) => {
    if (isPendingChangeFollowingState) return;
    changeFollowingState(
      { followingUserId, type: !isFollowing },
      {
        onSuccess: (data) => {
          setIsFollowingOverrides((prev) => ({
            ...prev,
            [followingUserId]: data.isFollowing,
          }));

          Toast.show({
            type: "default",
            text1: data.isFollowing
              ? `${nickname} 님을 띱했어요.`
              : `${nickname} 님을 띱 취소했어요.`,
          });
        },
      },
    );
  };

  const renderEmpty = () => {
    return (
      <View style={styles.status}>
        <AppText weight="medium" size="sm" color={colors.grey[200]}>
          아직 팔로잉한 사용자가 없어요.
        </AppText>
      </View>
    );
  };

  if (isPendingMyFollowings) {
    return (
      <View style={styles.status}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <ListTotalCountHeader length={totalFollowingCount} />
      <FlatList
        contentContainerStyle={[styles.list, { paddingBottom: bottom + 20 }]}
        data={myFollowingList}
        keyExtractor={(item) => String(item.userId)}
        renderItem={({ item }) => {
          const isFollowing =
            isFollowingOverrides[item.userId] ?? item.isFollowing;

          return (
            <MyThipItem
              userId={item.userId}
              profileImage={item.profileImageUrl}
              nickname={item.nickname}
              aliasName={item.aliasName}
              aliasColor={item.aliasColor}
              isFollowing={isFollowing}
              handleChangeFollowingState={() =>
                handleChangeFollowingState(
                  item.userId,
                  item.nickname,
                  isFollowing,
                )
              }
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmpty}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingMyFollowings}
            onRefresh={handleRefresh}
            tintColor={colors.white}
            colors={[colors.white]}
          />
        }
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
