import { useCallback, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import {
  useDeleteRecentSearchMutation,
  useGetRecentSearchQuery,
} from "@apis/recent-search";
import { RecentSearch, SearchBar } from "@shared/ui";

import { MostSearched, SearchResult } from "./components";

export default function SearchScreen() {
  const { recentSearchList } = useGetRecentSearchQuery("BOOK");
  const { deleteRecentSearch } = useDeleteRecentSearchMutation("BOOK");

  const [searchText, setSearchText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleChangeText = useCallback((text: string) => {
    setSearchText(text);
    setHasSearched(false);
  }, []);

  const handleSearch = useCallback(() => {
    if (searchText.trim() === "") return;
    setHasSearched(true);
  }, [searchText]);

  const handleClickKeyword = useCallback((keyword: string) => {
    setSearchText(keyword);
    setHasSearched(true);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.page}>
        <View style={styles.searchBar}>
          <SearchBar
            value={searchText}
            placeholder="책 제목, 작가명을 검색해보세요."
            setValue={handleChangeText}
            handleSearch={handleSearch}
          />
        </View>
        {!!searchText.trim() ? (
          <SearchResult searchText={searchText} hasSearched={hasSearched} />
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            <RecentSearch
              recentSearchedKeywords={recentSearchList}
              handleClickKeyword={handleClickKeyword}
              handleRemoveKeyword={deleteRecentSearch}
            />
            <MostSearched />
          </ScrollView>
        )}
      </View>
    </TouchableWithoutFeedback>
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
  status: {
    paddingVertical: 80,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
