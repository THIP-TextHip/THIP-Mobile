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

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

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
          return (
            <MyThipItem
              userId={item.userId}
              profileImage={item.profileImageUrl}
              nickname={item.nickname}
              aliasName={item.aliasName}
              aliasColor={item.aliasColor}
              isFollowing={item.isFollowing}
              handleChangeFollowingState={() =>
                handleChangeFollowingState(
                  item.userId,
                  item.nickname,
                  item.isFollowing,
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
            onRefresh={refetchMyFollowings}
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
