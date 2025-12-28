import { Image, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { OnboardingItem } from "../../constants";

interface OnboardingCarouselItemProps {
  item: OnboardingItem;
}

export default function OnboardingCarouselItem({
  item,
}: OnboardingCarouselItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <AppText weight="bold" size="xl" color={colors.white}>
          {item.title}
        </AppText>
        <AppText
          weight="semibold"
          size="base"
          color={colors.white}
          style={styles.description}
        >
          {item.description}
        </AppText>
      </View>
      <Image source={item.image} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 40,
  },
  textWrapper: {
    alignItems: "center",
    gap: 20,
  },
  description: {
    textAlign: "center",
    height: 48,
  },
  image: {
    width: 220,
    height: 453,
  },
});
