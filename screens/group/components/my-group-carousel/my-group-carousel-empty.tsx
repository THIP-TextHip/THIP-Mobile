import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

import { CharacterSearch } from "@images/thip/character";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function MyGroupCarouselEmpty() {
  return (
    <LinearGradient
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.2826, 1]}
      colors={[colors.white, "#989898"]}
      style={styles.emptyContainer}
    >
      <View style={styles.emptyTextWrapper}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.black.main}
          lineHeight={24}
        >
          참여 중인 모임방이 없어요
        </AppText>
        <AppText weight="regular" size="sm" color={colors.grey[300]}>
          모임방을 찾아 참여해보세요!
        </AppText>
      </View>
      <CharacterSearch style={{ paddingTop: 1 }} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    marginHorizontal: 30,
    borderRadius: 12,
    paddingTop: 34,
    alignItems: "center",
    gap: 20,
  },
  emptyTextWrapper: {
    gap: 4,
    alignItems: "center",
  },
});
