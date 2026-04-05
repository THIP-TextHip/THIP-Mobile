import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, View } from "react-native";

import { IcGroup } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { MyGroupCarouselItemType } from "../../types";

interface MyGroupCarouselItemProps {
  width: number;
  isActive: boolean;
  content: MyGroupCarouselItemType;
}

export default function MyGroupCarouselItem({
  width,
  isActive,
  content,
}: MyGroupCarouselItemProps) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.2826, 1]}
        colors={
          isActive
            ? [colors.white, "#989898"]
            : [colors.darkgrey.card, colors.darkgrey.card]
        }
        style={[
          styles.carouselItem,
          { width: width },
          !isActive && {
            height: 140,
          },
        ]}
      >
        {isActive && (
          <>
            <Image
              source={{ uri: content.bookImageUrl }}
              style={styles.image}
            />
            <View style={styles.content}>
              <View style={styles.groupInfo}>
                <AppText
                  weight="semibold"
                  size="lg"
                  color={colors.black.main}
                  lineHeight={24}
                  numberOfLines={1}
                >
                  {content.roomTitle}
                </AppText>
                <View style={styles.member}>
                  <IcGroup width={20} height={20} />
                  <AppText
                    weight="semibold"
                    size="sm"
                    color={colors.grey[300]}
                    lineHeight={24}
                  >
                    {content.memberCount}명
                  </AppText>
                </View>
              </View>
              <View style={styles.myProgressWrapper}>
                <View style={styles.progressLabel}>
                  <AppText weight="medium" size="sm" color={colors.grey[300]}>
                    내 진행도
                  </AppText>
                  <AppText
                    weight="semibold"
                    size="base"
                    color={colors.purple.main}
                    lineHeight={20}
                  >
                    {content.userPercentage}
                    <AppText
                      weight="semibold"
                      size="xs"
                      color={colors.purple.main}
                    >
                      %
                    </AppText>
                  </AppText>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.currentProgress,
                      { width: `${content.userPercentage}%` },
                    ]}
                  />
                </View>
              </View>
            </View>
          </>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 175,
    justifyContent: "center",
  },
  container: {
    borderRadius: 12,
    flexDirection: "row",
    height: 175,
    gap: 12,
  },
  carouselItem: {
    alignSelf: "center",
    borderRadius: 12,
    paddingVertical: 34,
    paddingHorizontal: 12,
    flexDirection: "row",
    height: 175,
    gap: 12,
  },
  image: {
    width: 80,
    height: 107,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  groupInfo: {
    gap: 4,
  },
  member: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  myProgressWrapper: {
    gap: 12,
  },
  progressLabel: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  progressBar: {
    height: 7,
    borderRadius: 12,
    backgroundColor: colors.grey[300],
  },
  currentProgress: {
    position: "absolute",
    left: 0,
    height: 7,
    borderRadius: 12,
    backgroundColor: colors.purple.main,
  },
});
