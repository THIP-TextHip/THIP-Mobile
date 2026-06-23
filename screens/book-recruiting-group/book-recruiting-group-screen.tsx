import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useBookDetailQuery, useBookRecruitingRoomsQuery } from "@apis/book";
import { AppText, ListTotalCountHeader, MyGroupCard } from "@shared/ui";
import { useSelectedBookStore } from "@stores/selected-book";
import { colors } from "@theme/token";

export default function BookRecruitingGroupScreen() {
  const { bottom } = useSafeAreaInsets();
  const { isbn } = useLocalSearchParams<{ isbn: string }>();
  const {
    recruitingRoomList,
    totalRoomCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingBookRecruitingRooms,
    isErrorBookRecruitingRooms,
    refetchBookRecruitingRooms,
    isRefetchingBookRecruitingRooms,
  } = useBookRecruitingRoomsQuery(isbn);
  const {
    bookDetailData,
    isPendingBookDetail,
    refetchBookDetail,
    isRefetchingBookDetail,
  } = useBookDetailQuery(isbn);
  const { setSelectedBookInfo } = useSelectedBookStore();

  if (isErrorBookRecruitingRooms || !bookDetailData) {
    return (
      <View style={styles.status}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
        >
          데이터를 불러오지 못했어요
        </AppText>
        <Pressable onPress={() => void refetchBookRecruitingRooms()}>
          <AppText
            weight="regular"
            size="sm"
            color={colors.grey[100]}
            lineHeight={20}
          >
            다시 시도하기
          </AppText>
        </Pressable>
      </View>
    );
  }

  if (isPendingBookRecruitingRooms || isPendingBookDetail) {
    return (
      <View style={styles.status}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  const renderEmpty = () => {
    return (
      <View style={styles.status}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
        >
          이 책으로 모집중인 모임방이 없어요.
        </AppText>
        <AppText
          weight="regular"
          size="sm"
          color={colors.grey[100]}
          lineHeight={20}
        >
          직접 모임방을 만들어보세요!
        </AppText>
      </View>
    );
  };

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const handleToCreateGroup = () => {
    setSelectedBookInfo({
      bookTitle: bookDetailData.title,
      authorName: bookDetailData.authorName,
      bookImageUrl: bookDetailData.imageUrl,
      isbn: bookDetailData.isbn,
    });
    router.push("/create-group");
  };

  return (
    <View style={styles.page}>
      <View style={styles.totalCountHeader}>
        <ListTotalCountHeader length={totalRoomCount} />
      </View>
      <FlatList
        contentContainerStyle={[
          styles.list,
          isFetchingNextPage && { paddingBottom: 40 },
        ]}
        data={recruitingRoomList}
        keyExtractor={(item) => String(item.roomId)}
        // TODO: 추후 MyGroupCard 네이밍 수정 필요. 내 모임방이 아닌 경우에도 사용되기 때문.
        renderItem={({ item }) => (
          <MyGroupCard
            roomId={item.roomId}
            bookImageUrl={item.bookImageUrl}
            roomName={item.roomName}
            recruitCount={item.recruitCount}
            memberCount={item.memberCount}
            endDate={item.deadlineEndDate}
            type="recruiting"
            isPublic={item.isPublic}
          />
        )}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={styles.footer} color={colors.white} />
          ) : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={
              isRefetchingBookRecruitingRooms || isRefetchingBookDetail
            }
            onRefresh={() => {
              refetchBookRecruitingRooms();
              refetchBookDetail();
            }}
            tintColor={colors.white}
            colors={[colors.white]}
          />
        }
      />
      {/* 이거 하고 나서 책 바텀시트에 쓰는 api도 연동하기 */}
      <Pressable
        style={[styles.bottomButton, { paddingBottom: bottom + 10 }]}
        onPress={handleToCreateGroup}
      >
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
        >
          모임방 만들기
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  totalCountHeader: {
    paddingVertical: 20,
  },
  status: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  list: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
  },
  footer: {
    marginTop: 40,
  },
  bottomButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.purple.main,
    paddingVertical: 12,
  },
});
