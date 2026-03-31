import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import { IcX } from "@images/icons";
import { AppText, SelectChip, TagButton } from "@shared/ui";
import { colors } from "@theme/token";

import { FEED_TAG_LIST, FEED_TAG_MAX } from "../../constants";

interface FeedTagSectionProps {
  selectedTagList: string[];
  handlePressTag: (tag: string) => void;
  handleDeleteTag: (tag: string) => void;
}

export default function FeedTagSection({
  selectedTagList,
  handlePressTag,
  handleDeleteTag,
}: FeedTagSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const handleSelectCategory = (label: string) => {
    setSelectedCategory(label);
  };

  const tagList = useMemo(() => {
    return (
      FEED_TAG_LIST.find((item) => item.label === selectedCategory)?.tagList ??
      []
    );
  }, [selectedCategory]);

  const isMax = selectedTagList.length === FEED_TAG_MAX;

  const SelectedTag = ({ selectedTag }: { selectedTag: string }) => {
    return (
      <View style={styles.selectedTag}>
        <AppText weight="regular" size="xs" color={colors.white}>
          #{selectedTag}
        </AppText>
        <Pressable onPress={() => handleDeleteTag(selectedTag)} hitSlop={10}>
          <IcX width={20} height={20} />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.section}>
      <AppText weight="semibold" size="lg" color={colors.white} lineHeight={24}>
        태그
      </AppText>
      <FlatList
        contentContainerStyle={styles.horizontalList}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={FEED_TAG_LIST}
        keyExtractor={(item) => String(item.type)}
        renderItem={({ item }) => (
          <SelectChip
            label={item.label}
            isSelected={item.label === selectedCategory}
            handleSelect={() => handleSelectCategory(item.label)}
            type="category"
          />
        )}
      />
      {!!selectedCategory && (
        <View style={styles.tagList}>
          {tagList.map((tag) => (
            <TagButton
              key={tag}
              tag={tag}
              isSelected={selectedTagList.includes(tag)}
              handlePressTag={() => handlePressTag(tag)}
            />
          ))}
        </View>
      )}
      <AppText
        weight="regular"
        size="xs"
        color={isMax ? colors.red : colors.neongreen}
        style={styles.count}
      >
        {selectedTagList.length} / {FEED_TAG_MAX}개
      </AppText>
      {selectedTagList.length > 0 && (
        <View style={styles.selectedTagListSection}>
          <AppText weight="regular" size="sm" color={colors.grey[100]}>
            선택된 태그
          </AppText>
          <FlatList
            contentContainerStyle={styles.horizontalList}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={selectedTagList}
            renderItem={({ item }) => <SelectedTag selectedTag={item} />}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  horizontalList: {
    gap: 8,
  },
  tagList: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  count: {
    textAlign: "right",
  },
  selectedTagListSection: {
    gap: 12,
  },
  selectedTag: {
    height: 30,
    paddingRight: 8,
    paddingLeft: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grey[200],
  },
});
