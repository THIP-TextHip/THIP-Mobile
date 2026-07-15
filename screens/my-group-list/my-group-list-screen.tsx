import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { type MyRoomType, useGetMyRoomListQuery } from "@apis/room";
import { AppText, MyGroupCard } from "@shared/ui";
import { colors } from "@theme/token";

import { MyGroupTopFilter } from "./components";

export default function MyGroupListScreen() {
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [myGroupType, setMyGroupType] = useState<MyRoomType>(
    "playingAndRecruiting",
  );
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
  } = useGetMyRoomListQuery(myGroupType);

  const handleSelectType = (type: MyRoomType) => {
    if (type === myGroupType) {
      setMyGroupType("playingAndRecruiting");
      return;
    }
    setMyGroupType(type);
  };

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

  const MyGroupEmpty = () => {
    return (
      <View style={[styles.status, { height: height - 300 }]}>
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
              참여중인 모임방이 없어요
            </AppText>
            <AppText
              weight="regular"
              size="sm"
              color={colors.grey[100]}
              lineHeight={20}
            >
              첫번째 모임방에 참여해보세요.
            </AppText>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <MyGroupTopFilter
        myGroupType={myGroupType}
        handleSelectType={handleSelectType}
      />
      <FlatList
        contentContainerStyle={[styles.list, { paddingBottom: bottom + 20 }]}
        data={myRoomList}
        keyExtractor={(item) => String(item.roomId)}
        renderItem={({ item }) => <MyGroupCard {...item} />}
        ListEmptyComponent={MyGroupEmpty}
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
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 20,
    gap: 20,
  },
  status: {
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
