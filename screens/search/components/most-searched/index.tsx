import { StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface MostSearchedProps {
  mostSearchedBooks: string[];
}

export default function MostSearched({ mostSearchedBooks }: MostSearchedProps) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <AppText weight="semibold" size="lg" color={colors.grey[100]}>
          가장 많이 검색된 책
        </AppText>
        <AppText weight="regular" size="2xs" color={colors.grey[300]}>
          {month}.{date}. 기준
        </AppText>
      </View>
      {mostSearchedBooks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AppText weight="semibold" size="lg" color={colors.white}>
            아직 순위가 집계되지 않았어요
          </AppText>
          <AppText weight="regular" size="sm" color={colors.grey[100]}>
            조금만 기다려주세요!
          </AppText>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
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
});
