import { StyleSheet, View } from "react-native";

import { AppText, RemovableChip } from "@shared/ui";
import { colors } from "@theme/token";

interface RecentSearchProps {
  recentSearchedKeywords: string[];
}

export default function RecentSearch({
  recentSearchedKeywords,
}: RecentSearchProps) {
  const handleClickKeyword = (keyword: string) => {
    console.log(keyword, " 검색");
  };
  const handleRemoveKeyword = (keyword: string) => {
    console.log(keyword, " 삭제");
  };
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
          {recentSearchedKeywords.map((keyword, idx) => (
            <RemovableChip
              key={`${keyword}-${idx}`}
              text={keyword}
              handleClickChip={() => handleClickKeyword(keyword)}
              handleRemove={() => handleRemoveKeyword(keyword)}
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
