import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RECENT_SEARCH_QUERY_KEY } from "@apis/recent-search";
import { useSearchRoomQuery } from "@apis/room";
import { AppText, ListTotalCountHeader, SelectChip } from "@shared/ui";
import { colors } from "@theme/token";

import { SEARCH_GROUP_CATEGORY } from "../../constants";
import { SearchGroupCategoryType } from "../../types";
import SearchedGroupItem from "../searched-group-item";

const Separator = () => <View style={styles.separator} />;

const EmptyView = () => {
  return (
    <View style={styles.empty}>
      <AppText weight="semibold" size="lg" color={colors.white} lineHeight={24}>
        해당하는 모임방이 없어요
      </AppText>
      <AppText weight="regular" size="sm" color={colors.grey[100]}>
        직접 모임방을 만들어보세요.
      </AppText>
    </View>
  );
};

interface SearchGroupResultProps {
  searchText: string;
  hasSearched: boolean;
  roomCategory: SearchGroupCategoryType | null;
  handleChangeCategory: (roomCategory: SearchGroupCategoryType) => void;
}

export default function SearchGroupResult({
  searchText,
  hasSearched,
  roomCategory,
  handleChangeCategory,
}: SearchGroupResultProps) {
  const queryClient = useQueryClient();
  const { bottom } = useSafeAreaInsets();
  const isAllCategory = roomCategory === null || roomCategory === "전체";
  const category = isAllCategory ? undefined : roomCategory;

  const {
    searchRoomList,
    fetchNextPage,
    hasNextPage,
    isPendingSearchRoom,
    isFetchingSearchRoom,
    isFetchingNextPage,
  } = useSearchRoomQuery({
    keyword: searchText,
    category,
    isAllCategory,
    sort: "deadline",
    isFinalized: hasSearched,
  });

  useEffect(() => {
    const normalizedSearchText = searchText.trim();

    if (
      !hasSearched ||
      normalizedSearchText === "" ||
      isPendingSearchRoom ||
      isFetchingSearchRoom
    ) {
      return;
    }

    queryClient.invalidateQueries({
      queryKey: RECENT_SEARCH_QUERY_KEY.LIST("ROOM"),
      refetchType: "all",
    });
  }, [
    hasSearched,
    isFetchingSearchRoom,
    isPendingSearchRoom,
    queryClient,
    searchText,
  ]);

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const renderEmpty = () => {
    if (isPendingSearchRoom) {
      return (
        <View style={styles.empty}>
          <ActivityIndicator color={colors.white} />
        </View>
      );
    }

    return <EmptyView />;
  };

  return (
    <View style={styles.container}>
      {roomCategory && (
        <View style={styles.header}>
          <FlatList
            contentContainerStyle={styles.category}
            data={SEARCH_GROUP_CATEGORY}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <SelectChip
                label={item}
                isSelected={item === roomCategory}
                handleSelect={() => handleChangeCategory(item)}
                type="category"
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <ListTotalCountHeader length={searchRoomList.length} />
        </View>
      )}
      <FlatList
        contentContainerStyle={[
          styles.list,
          searchRoomList.length === 0 && { flex: 1 },
          { paddingBottom: bottom },
          roomCategory && { paddingTop: 8 },
        ]}
        data={searchRoomList}
        keyExtractor={(item) => String(item.roomId)}
        renderItem={({ item }) => <SearchedGroupItem searchedGroup={item} />}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={styles.footer} color={colors.white} />
          ) : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    gap: 20,
  },
  category: {
    paddingHorizontal: 20,
    gap: 12,
  },
  list: {
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkgrey.dark,
    marginTop: 12,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  footer: {
    marginTop: 20,
  },
});
