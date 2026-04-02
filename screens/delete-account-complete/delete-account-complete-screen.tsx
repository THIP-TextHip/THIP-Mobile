import { StyleSheet, useWindowDimensions, View } from "react-native";

import {
  GenreArt,
  GenreHumanity,
  GenreScience,
  GenreSocialScience,
} from "@images/thip/genre";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function DeleteAccountCompleteScreen() {
  const { width } = useWindowDimensions();
  const imageWidth = (width - 45) / 4;

  return (
    <View style={styles.page}>
      <View style={styles.textWrapper}>
        <AppText weight="bold" size="xl" color={colors.white} lineHeight={24}>
          탈퇴 완료
        </AppText>
        <AppText
          weight="medium"
          size="base"
          color={colors.white}
          lineHeight={24}
        >
          다음에 또 만나요!
        </AppText>
      </View>
      {/* TODO: 회원탈퇴 이미지 관련해서 논의 필요 */}
      <View style={styles.imageWrapper}>
        <GenreHumanity width={imageWidth} height={80} />
        <GenreArt width={imageWidth} height={80} />
        <GenreScience width={imageWidth} height={80} />
        <GenreSocialScience width={imageWidth} height={80} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    marginBottom: 56,
  },
  textWrapper: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    flexDirection: "row",
    gap: 15,
    alignItems: "flex-end",
  },
});
