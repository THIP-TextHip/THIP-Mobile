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
const DUMMY_MOST_DATA = [
  { ranking: 1, photo: "https://placehold.co/60/png", title: "예시입니다" },
  { ranking: 2, photo: "https://placehold.co/60/png", title: "테스트" },
  { ranking: 3, photo: "https://placehold.co/60/png", title: "배고프다" },
  {
    ranking: 4,
    photo: "https://placehold.co/60/png",
    title: "테스트입니당",
  },
  {
    ranking: 5,
    photo: "https://placehold.co/60/png",
    title: "26년도 화이팅!",
  },
];

export default function SearchScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.searchBar}>
        <AppText color={colors.white}>검색바 위치</AppText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <RecentSearch recentSearchedKeywords={DUMMY_RECENT_DATA} />
        <MostSearched mostSearchedBooks={DUMMY_MOST_DATA} />
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
    flexGrow: 1,
    gap: 32,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
