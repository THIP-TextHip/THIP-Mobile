import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import type { RecordBookVoteItemType } from "../../types";
import { calculateVoteFillPercent } from "../../utils";

interface RecordVoteListProps {
  voteItems: RecordBookVoteItemType[];
  handleVote: (voteItemId: number) => void;
}

export default function RecordVoteList({
  voteItems,
  handleVote,
}: RecordVoteListProps) {
  if (voteItems.length === 0) {
    return null;
  }

  const totalVoteCount = voteItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <View style={styles.container}>
      {voteItems.map((item, index) => {
        const fillPercent = calculateVoteFillPercent(
          item.count,
          totalVoteCount,
        );

        return (
          <Pressable
            key={item.voteItemId}
            style={[styles.voteItem, item.isVoted && styles.isVotedItem]}
            onPress={() => handleVote(item.voteItemId)}
          >
            <AppText
              style={styles.voteContent}
              weight="semibold"
              size="sm"
              color={item.isVoted ? colors.neongreen : colors.white}
            >
              {index + 1}. {item.itemName}
            </AppText>
            <AppText
              style={styles.voteCount}
              weight="semibold"
              size="sm"
              color={item.isVoted ? colors.neongreen : colors.white}
            >
              {item.count}표
            </AppText>
            <View
              style={[
                styles.voteFill,
                item.isVoted && { backgroundColor: colors.purple.main },
                { width: `${fillPercent}%` },
                fillPercent >= 97 && {
                  borderRadius: 12,
                },
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  voteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.darkgrey.main,
    height: 44,
  },
  voteFill: {
    position: "absolute",
    height: 44,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    left: 0,
    backgroundColor: colors.grey[300],
    zIndex: -1,
  },
  voteContent: {
    paddingLeft: 12,
  },
  voteCount: {
    paddingRight: 12,
  },
  isVotedItem: {
    backgroundColor: colors.purple.dark,
  },
});
