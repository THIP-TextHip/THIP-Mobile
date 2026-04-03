import React from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText, FeedPostPreview } from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_SAVED_FEED_LIST } from "../../constants";

export default function SavedFeed() {
  const { height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const SavedFeedEmpty = () => {
    return (
      <View style={[styles.empty, { height: height - 300 }]}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
        >
          저장된 피드가 없어요
        </AppText>
        <AppText
          weight="regular"
          size="sm"
          color={colors.grey[100]}
          lineHeight={20}
        >
          마음에 드는 피드를 THIP 해보세요!
        </AppText>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={[styles.list, { paddingBottom: bottom + 32 }]}
      data={DUMMY_SAVED_FEED_LIST}
      keyExtractor={(item) => String(item.feedId)}
      renderItem={({ item }) => <FeedPostPreview feedPreview={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={SavedFeedEmpty}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 32,
    gap: 40,
  },
  separator: {
    marginTop: 40,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
  empty: {
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
