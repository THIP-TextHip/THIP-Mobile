import { useCallback, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { RecentSearch, SearchBar } from "@shared/ui";

import { MostSearched, SearchResult } from "./components";
import { DUMMY_MOST_DATA, DUMMY_RECENT_DATA } from "./constants";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleChangeText = useCallback((text: string) => {
    setSearchText(text);
    setHasSearched(false);
  }, []);
  const handleSearch = useCallback(() => {
    console.log(searchText, " 검색");
    setHasSearched(true);
  }, [searchText]);

  const handleClickKeyword = useCallback((keyword: string) => {
    console.log(keyword, " 검색");
  }, []);
  const handleRemoveKeyword = useCallback((keyword: string) => {
    console.log(keyword, " 삭제");
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
              recentSearchedKeywords={DUMMY_RECENT_DATA}
              handleClickKeyword={handleClickKeyword}
              handleRemoveKeyword={handleRemoveKeyword}
            />
            <MostSearched mostSearchedBooks={DUMMY_MOST_DATA} />
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
});
