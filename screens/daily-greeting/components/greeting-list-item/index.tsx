import { StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { DailyGreetingCommentType } from "../../types";
import GreetingItem from "../greeting-item";

interface GreetingListItemProps {
  isLatestComment: boolean;
  isOldestComment: boolean;
  isFirstCommentOfDate: boolean;
  greetingItem: DailyGreetingCommentType;
}

export default function GreetingListItem({
  isLatestComment,
  isOldestComment,
  isFirstCommentOfDate,
  greetingItem,
}: GreetingListItemProps) {
  const Separator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.itemWrapper}>
      {isFirstCommentOfDate && !isOldestComment && <Separator />}
      {isFirstCommentOfDate && (
        <View
          style={[styles.dateWrapper, isOldestComment && { marginTop: 20 }]}
        >
          <AppText
            weight="regular"
            size="sm"
            color={colors.neongreen}
            lineHeight={24}
            style={styles.date}
          >
            {greetingItem.date}
          </AppText>
        </View>
      )}
      <GreetingItem isLatest={isLatestComment} greetingItem={greetingItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    gap: 20,
  },
  separator: {
    marginTop: -12,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
  dateWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.darkgrey.dark,
  },
});
