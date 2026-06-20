import { StyleSheet, View } from "react-native";

import { RecentSearchContentType } from "@apis/recent-search";
import { colors } from "@theme/token";

import AppText from "../app-text";
import RemovableChip from "../removable-chip";

interface RecentSearchProps {
  recentSearchedKeywords: RecentSearchContentType[];
  handleClickKeyword: (keyword: string) => void;
  handleRemoveKeyword: (recentSearchId: number) => void;
}

export default function RecentSearch({
  recentSearchedKeywords,
  handleClickKeyword,
  handleRemoveKeyword,
}: RecentSearchProps) {
  return (
    <View style={styles.container}>
      <AppText weight="semibold" size="lg" color={colors.grey[100]}>
        최근 검색어
      </AppText>
      {recentSearchedKeywords.length === 0 ? (
        <AppText weight="regular" size="sm" color={colors.grey[200]}>
          최근 검색어가 아직 없어요.
        </AppText>
      ) : (
        <View style={styles.recentSearchWrapper}>
          {recentSearchedKeywords.map((recentSearch, idx) => (
            <RemovableChip
              key={`${recentSearch.searchTerm}-${idx}`}
              text={recentSearch.searchTerm}
              handleClickChip={() =>
                handleClickKeyword(recentSearch.searchTerm)
              }
              handleRemove={() =>
                handleRemoveKeyword(recentSearch.recentSearchId)
              }
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  recentSearchWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
