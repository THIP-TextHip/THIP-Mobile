import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

import { CharacterSearch } from "@images/thip";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface MyGroupCarouselStatusProps {
  isError: boolean;
  errorCode?: number;
}

export default function MyGroupCarouselStatus({
  isError,
  errorCode,
}: MyGroupCarouselStatusProps) {
  return (
    <LinearGradient
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.2826, 1]}
      colors={[colors.white, "#989898"]}
      style={styles.statusContainer}
    >
      <View style={styles.statusTextWrapper}>
        {isError ? (
          <AppText
            weight="semibold"
            size="lg"
            color={colors.black.main}
            lineHeight={24}
          >
            데이터를 불러오지 못했어요 ({errorCode})
          </AppText>
        ) : (
          <>
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
          </>
        )}
      </View>
      <CharacterSearch style={{ paddingTop: 1 }} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    marginHorizontal: 30,
    borderRadius: 12,
    paddingTop: 34,
    alignItems: "center",
    gap: 20,
  },
  statusTextWrapper: {
    gap: 4,
    alignItems: "center",
  },
});
