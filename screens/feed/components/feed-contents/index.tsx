import { FlatList, StyleSheet, View } from "react-native";

import { FeedPostPreview } from "@shared/ui";
import { DUMMY_FEED_PREVIEW_LIST } from "@shared/ui/feed-post-preview/constants";
import { colors } from "@theme/token";

import MyThipPreview from "../my-thip-preview";

// TODO: 추후 지금 뜨는 추천 글 기능 추가 예정

export default function FeedContents() {
  return (
    <FlatList
      contentContainerStyle={styles.contents}
      ListHeaderComponent={<MyThipPreview />}
      data={DUMMY_FEED_PREVIEW_LIST}
      keyExtractor={(item) => String(item.feedId)}
      renderItem={({ item }) => <FeedPostPreview feedPreview={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  contents: {
    paddingTop: 20,
    paddingBottom: 40,
    gap: 40,
  },
  separator: {
    marginTop: 40,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
});
