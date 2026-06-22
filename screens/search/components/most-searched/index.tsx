import { useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useMostSearchedBookQuery } from "@apis/book";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import MostSearchedBookItem from "../most-searched-book-item";

export default function MostSearched() {
  const {
    mostSearchedBookData,
    isPendingMostSearchedBook,
    isErrorMostSearchedBook,
  } = useMostSearchedBookQuery();

  const dateString = useMemo(() => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");

    return `${month}.${date}.`;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <AppText weight="semibold" size="lg" color={colors.grey[100]}>
          가장 많이 검색된 책
        </AppText>
        <AppText weight="regular" size="2xs" color={colors.grey[300]}>
          {dateString} 기준
        </AppText>
      </View>
      {isPendingMostSearchedBook ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      ) : isErrorMostSearchedBook ? (
        <View style={styles.emptyContainer}>
          <AppText weight="semibold" size="lg" color={colors.white}>
            데이터를 불러오지 못했어요
          </AppText>
        </View>
      ) : mostSearchedBookData?.bookList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AppText weight="semibold" size="lg" color={colors.white}>
            아직 순위가 집계되지 않았어요
          </AppText>
          <AppText weight="regular" size="sm" color={colors.grey[100]}>
            조금만 기다려주세요!
          </AppText>
        </View>
      ) : (
        mostSearchedBookData?.bookList.map((item, index) => (
          <MostSearchedBookItem
            key={item.isbn}
            isbn={item.isbn}
            ranking={item.rank}
            photo={item.imageUrl}
            title={item.title}
            isLast={index === mostSearchedBookData?.bookList.length - 1}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black.main,
  },
});
