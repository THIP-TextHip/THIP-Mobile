import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { IcDeleteGrey } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors, typography } from "@theme/token";

import {
  VOTE_CONTENT_ITEM_MAX_LENGTH,
  VOTE_CONTENT_PLACEHOLDER,
  VOTE_ITEM_MAX_COUNT,
  VOTE_ITEM_PLACEHOLDER,
} from "../../constants";

interface VoteContentSectionProps {
  content: string;
  voteItemList: { itemName: string }[];
  handleChangeContent: (content: string) => void;
  handleChangeVoteItemList: (voteItemList: { itemName: string }[]) => void;
}

export default function VoteContentSection({
  content,
  voteItemList,
  handleChangeContent,
  handleChangeVoteItemList,
}: VoteContentSectionProps) {
  const handleAddItem = () => {
    if (voteItemList.length >= VOTE_ITEM_MAX_COUNT) {
      return;
    }
    handleChangeVoteItemList([...voteItemList, { itemName: "" }]);
  };

  const handleChangeItemName = (index: number, itemName: string) => {
    handleChangeVoteItemList(
      voteItemList.map((item, itemIndex) =>
        itemIndex === index ? { ...item, itemName } : item,
      ),
    );
  };

  const handleDeleteItem = (index: number) => {
    handleChangeVoteItemList(
      voteItemList.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  return (
    <View style={styles.section}>
      <TextInput
        style={styles.contentInput}
        value={content}
        onChangeText={handleChangeContent}
        placeholder={VOTE_CONTENT_PLACEHOLDER}
        placeholderTextColor={colors.grey[300]}
        selectionColor={colors.neongreen}
        cursorColor={colors.neongreen}
        maxLength={VOTE_CONTENT_ITEM_MAX_LENGTH}
      />
      <View style={styles.voteItemWrapper}>
        {voteItemList.map((item, index) => (
          <View key={index} style={styles.itemInputContainer}>
            <TextInput
              style={styles.itemInput}
              value={item.itemName}
              onChangeText={(text) => handleChangeItemName(index, text)}
              placeholder={VOTE_ITEM_PLACEHOLDER}
              placeholderTextColor={colors.grey[300]}
              selectionColor={colors.neongreen}
              cursorColor={colors.neongreen}
              maxLength={VOTE_CONTENT_ITEM_MAX_LENGTH}
            />
            {index >= 2 && (
              <Pressable onPress={() => handleDeleteItem(index)} hitSlop={5}>
                <IcDeleteGrey />
              </Pressable>
            )}
          </View>
        ))}
        {voteItemList.length < VOTE_ITEM_MAX_COUNT && (
          <Pressable style={styles.addButton} onPress={handleAddItem}>
            <AppText weight="semibold" size="base" color={colors.black.main}>
              항목 추가
            </AppText>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 20,
  },
  contentInput: {
    color: colors.white,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    lineHeight: 24,
  },
  itemInputContainer: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey[300],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInput: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
  },
  voteItemWrapper: {
    gap: 12,
  },
  addButton: {
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.white,
  },
});
