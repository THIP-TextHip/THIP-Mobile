import { Pressable, StyleSheet, View } from "react-native";

import { GROUP_CATEGORY } from "@shared/constants";
import type { GroupCategoryType } from "@shared/types";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface RecruitingGroupCarouselHeaderProps {
  label: string;
  selectedCategory: GroupCategoryType;
  handleChangeCategory: (category: GroupCategoryType) => void;
}

export default function RecruitingGroupCarouselHeader({
  label,
  selectedCategory,
  handleChangeCategory,
}: RecruitingGroupCarouselHeaderProps) {
  return (
    <>
      <AppText
        weight="bold"
        size="xl"
        color={colors.white}
        lineHeight={24}
        style={styles.label}
      >
        {label} 독서 모임방
      </AppText>
      <View style={styles.categoryWrapper}>
        {GROUP_CATEGORY.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryButton,
              category === selectedCategory && {
                backgroundColor: colors.purple.main,
              },
            ]}
            onPress={() => handleChangeCategory(category)}
          >
            <AppText weight="regular" size="xs" color={colors.white}>
              {category}
            </AppText>
          </Pressable>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    marginBottom: 32,
  },
  categoryWrapper: {
    flexDirection: "row",
    gap: 4,
    rowGap: 8,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.darkgrey.main,
  },
});
