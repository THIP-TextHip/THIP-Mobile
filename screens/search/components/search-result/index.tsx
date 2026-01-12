import { router } from "expo-router";
import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { AppText, CustomButton } from "@shared/ui";
import { colors } from "@theme/token";

import SearchedBookItem from "../../components/searched-book-item";
import { DUMMY_SEARCHED_BOOKS } from "../../constants";

interface SearchResultProps {
  searchText: string;
  hasSearched: boolean;
}

export default function SearchResult({
  searchText,
  hasSearched,
}: SearchResultProps) {
  // TODO: searchText로 추후 서버 api 연동하여 검색된 책 리스트 조회

  const handleToBookRequestPage = useCallback(() => {
    router.push("/book-request");
  }, []);

  // TODO: 추후 타입 만들어서 수정
  const listItem = useCallback(
    ({
      item,
    }: {
      item: {
        title: string;
        imageUrl: string;
        authorName: string;
        publisher: string;
        isbn: string;
      };
    }) => (
      <SearchedBookItem
        title={item.title}
        imageUrl={item.imageUrl}
        authorName={item.authorName}
        publisher={item.publisher}
        isbn={item.isbn}
      />
    ),
    []
  );

  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      {hasSearched && DUMMY_SEARCHED_BOOKS.length !== 0 && (
        <View style={styles.entireCount}>
          <AppText weight="medium" size="sm" color={colors.grey[100]}>
            전체 {DUMMY_SEARCHED_BOOKS.length}
          </AppText>
        </View>
      )}
      {DUMMY_SEARCHED_BOOKS.length === 0 ? (
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
            <AppText weight="semibold" size="base" color={colors.white}>
              책 신청하기
            </AppText>
          </CustomButton>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.booksWrapper}
          data={DUMMY_SEARCHED_BOOKS}
          keyExtractor={(item) => item.isbn}
          renderItem={listItem}
          ItemSeparatorComponent={Separator}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
});
