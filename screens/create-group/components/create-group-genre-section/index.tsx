import { FlatList, StyleSheet, View } from "react-native";

import { GROUP_CATEGORY } from "@/src/shared/constants";
import { GroupCategoryType } from "@shared/types";
import { AppText, SelectChip } from "@shared/ui";
import { colors } from "@theme/token";

interface CreateGroupGenreSectionProps {
  selectedCategory: GroupCategoryType | null;
  handleChangeCategory: (category: GroupCategoryType) => void;
}

export default function CreateGroupGenreSection({
  selectedCategory,
  handleChangeCategory,
}: CreateGroupGenreSectionProps) {
  return (
    <View style={styles.section}>
      <AppText
        style={styles.label}
        weight="semibold"
        size="lg"
        color={colors.white}
        lineHeight={24}
      >
        책 장르
      </AppText>
      <FlatList
        contentContainerStyle={styles.genreWrapper}
        horizontal
        data={GROUP_CATEGORY}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <SelectChip
            key={item}
            label={item}
            isSelected={selectedCategory === item}
            handleSelect={() => handleChangeCategory(item)}
          />
        )}
      />
      <AppText
        style={styles.desc}
        weight="regular"
        size="xs"
        color={colors.neongreen}
      >
        책을 가장 잘 설명하는 장르를 하나 골라주세요.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  label: {
    paddingHorizontal: 20,
  },
  desc: {
    paddingHorizontal: 20,
    textAlign: "right",
  },
  genreWrapper: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
