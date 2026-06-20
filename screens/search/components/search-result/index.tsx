import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import { useSearchBookQuery, type BookType } from "@apis/book";
import { RECENT_SEARCH_QUERY_KEY } from "@apis/recent-search";
import { AppText, CustomButton, ListTotalCountHeader } from "@shared/ui";
import { useQueryClient } from "@tanstack/react-query";
import { colors } from "@theme/token";

import SearchedBookItem from "../../components/searched-book-item";

interface SearchResultProps {
  searchText: string;
  hasSearched: boolean;
}

export default function SearchResult({
  searchText,
  hasSearched,
}: SearchResultProps) {
  const queryClient = useQueryClient();
  const {
    searchBookList,
    totalElements,
    fetchNextPage,
    hasNextPage,
    isPendingSearchBook,
    isFetchingSearchBook,
    isFetchingNextPage,
  } = useSearchBookQuery(searchText, 1, hasSearched);

  useEffect(() => {
    const normalizedSearchText = searchText.trim();

    if (
      !hasSearched ||
      normalizedSearchText === "" ||
      isPendingSearchBook ||
      isFetchingSearchBook
    ) {
      return;
    }

    void queryClient.invalidateQueries({
      queryKey: RECENT_SEARCH_QUERY_KEY.LIST("BOOK"),
    });
  }, [
    hasSearched,
    isFetchingSearchBook,
    isPendingSearchBook,
    queryClient,
    searchText,
  ]);

  const handleToBookRequestPage = useCallback(() => {
    router.push("/book-request");
  }, []);

  const listItem = useCallback(
    ({ item }: { item: BookType }) => (
      <SearchedBookItem
        title={item.title}
        imageUrl={item.imageUrl}
        authorName={item.authorName}
        publisher={item.publisher}
        isbn={item.isbn}
      />
    ),
    [],
  );

  const Separator = () => <View style={styles.separator} />;

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  if (isPendingSearchBook) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {hasSearched && searchBookList.length !== 0 && (
        <ListTotalCountHeader length={totalElements} />
      )}
      {searchBookList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyText}>
            <AppText weight="semibold" size="lg" color={colors.white}>
              현재 등록된 책이 없어요
            </AppText>
            <AppText weight="regular" size="sm" color={colors.grey[100]}>
              원하는 책을 신청해주세요!
            </AppText>
          </View>
          <CustomButton handlePress={handleToBookRequestPage}>
            <AppText
              weight="semibold"
              size="base"
              color={colors.white}
              lineHeight={24}
            >
              책 신청하기
            </AppText>
          </CustomButton>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={[
            styles.booksWrapper,
            isFetchingNextPage && { paddingBottom: 40 },
          ]}
          data={searchBookList}
          keyExtractor={(item) => item.isbn}
          renderItem={listItem}
          ItemSeparatorComponent={Separator}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={styles.footer} color={colors.white} />
            ) : null
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  entireCount: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkgrey.dark,
  },
  booksWrapper: {
    gap: 12,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkgrey.dark,
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  emptyText: {
    gap: 8,
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    marginTop: 20,
  },
});
