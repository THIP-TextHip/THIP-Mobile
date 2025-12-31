import { ScrollView, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";
import { MostSearched, RecentSearch } from "./components";

const DUMMY_RECENT_DATA = [
  "테스트1",
  "검색어",
  "예시입니다",
  "어쩌구",
  "ㅁㄴㅇㄹ",
];

export default function SearchScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.searchBar}>
        <AppText color={colors.white}>검색바 위치</AppText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <RecentSearch recentSearchedKeywords={DUMMY_RECENT_DATA} />
        <MostSearched mostSearchedBooks={[]} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  searchBar: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 32,
  },
});
