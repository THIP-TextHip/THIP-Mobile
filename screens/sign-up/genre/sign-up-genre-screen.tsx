import { StyleSheet, View } from "react-native";

import { AppText, GenreCardGroup } from "@shared/ui";
import { colors } from "@theme/token";

interface SignUpGenreScreenProps {
  selectedGenre: string | null;
  setSelectedGenre: (v: string | null) => void;
}

export default function SignUpGenreScreen({
  selectedGenre,
  setSelectedGenre,
}: SignUpGenreScreenProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.pageContainer}>
        <View style={styles.textWrapper}>
          <AppText weight="semibold" size="lg" color={colors.white}>
            관심있는 장르를 하나 선택해주세요.
          </AppText>
          <AppText weight="regular" size="sm" color={colors.grey[100]}>
            이후 내 정보에서 변경이 가능해요.
          </AppText>
        </View>
        <GenreCardGroup
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
    gap: 20,
    zIndex: 1,
  },
  textWrapper: {
    gap: 8,
  },
  genreWrapper: {
    width: "100%",
    gap: 16,
  },
});
