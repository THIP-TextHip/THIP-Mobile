import { StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface RecentSearchProps {
  recentSearchedKeywords: string[];
}

export default function RecentSearch({
  recentSearchedKeywords,
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
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
