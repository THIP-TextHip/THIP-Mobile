import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useGetMyRoomListQuery } from "@apis/room";
import { useGetMyInfoQuery } from "@apis/user";
import { AppText, MyGroupCard } from "@shared/ui";
import { colors } from "@theme/token";

export default function ExpiredGroupListScreen() {
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const { myInfo } = useGetMyInfoQuery();
  const {
    myRoomList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingMyRoomList,
    isErrorMyRoomList,
    myRoomListError,
    refetchMyRoomList,
    isRefetchingMyRoomList,
  } = useGetMyRoomListQuery("expired");

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  if (isPendingMyRoomList) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  const ListHeader = () => {
    return (
      <AppText weight="regular" size="sm" color={colors.white} lineHeight={24}>
        {myInfo?.nickname}님이 참여했던 모임방들을 확인해보세요.
      </AppText>
    );
  };

  const ExpiredGroupEmpty = () => {
    return (
      <View style={[styles.empty, { height: height - 300 }]}>
        {isErrorMyRoomList ? (
          <AppText
            weight="semibold"
            size="lg"
            color={colors.white}
            lineHeight={24}
          >
            데이터를 불러오지 못했어요 ({myRoomListError?.code})
          </AppText>
        ) : (
          <>
            <AppText
              weight="semibold"
              size="lg"
              color={colors.white}
              lineHeight={24}
            >
              완료된 모임방이 없어요.
            </AppText>
            <AppText
              weight="regular"
              size="sm"
              color={colors.grey[100]}
              lineHeight={20}
            >
              모임방을 끝까지 완료해보세요.
            </AppText>
          </>
        )}
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={[styles.container, { paddingBottom: bottom + 20 }]}
      data={myRoomList}
      keyExtractor={(item) => String(item.roomId)}
      ListHeaderComponent={ListHeader}
      renderItem={({ item }) => <MyGroupCard {...item} />}
      ListEmptyComponent={ExpiredGroupEmpty}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator style={styles.footer} color={colors.white} />
        ) : null
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingMyRoomList}
          onRefresh={refetchMyRoomList}
          tintColor={colors.white}
          colors={[colors.white]}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  empty: {
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    marginTop: 40,
  },
});
