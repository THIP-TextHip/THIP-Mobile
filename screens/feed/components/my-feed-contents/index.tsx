import { FlatList, StyleSheet, View } from "react-native";

import {
  FeedPostPreview,
  ListTotalCountHeader,
  ThipPreview,
  UserProfileBar,
} from "@shared/ui";
import { colors } from "@theme/token";

// TODO: 서버에서 가져오기
import {
  DUMMY_MY_FEED_PREVIEW_LIST,
  DUMMY_MY_FEED_TOP_VIEW,
} from "../../constants";
import MyFeedEmpty from "../my-feed-empty";

const MyFeedTopContents = () => {
  return (
    <View style={styles.topContents}>
      <View style={styles.profile}>
        <UserProfileBar
          userProfile={{
            nickname: DUMMY_MY_FEED_TOP_VIEW.nickname,
            genre: DUMMY_MY_FEED_TOP_VIEW.aliasName,
            profileColor: DUMMY_MY_FEED_TOP_VIEW.aliasColor,
          }}
        />
        <ThipPreview
          userId={DUMMY_MY_FEED_TOP_VIEW.creatorId}
          followerCount={DUMMY_MY_FEED_TOP_VIEW.followerCount}
          thipList={DUMMY_MY_FEED_TOP_VIEW.latestFollowerProfileImageUrls}
        />
      </View>
      <ListTotalCountHeader length={DUMMY_MY_FEED_TOP_VIEW.totalFeedCount} />
    </View>
  );
};

export default function MyFeedContents() {
  return (
    <FlatList
      contentContainerStyle={styles.list}
      ListHeaderComponent={<MyFeedTopContents />}
      data={DUMMY_MY_FEED_PREVIEW_LIST}
      keyExtractor={(item) => String(item.feedId)}
      renderItem={({ item }) => <FeedPostPreview feedPreview={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={() => <MyFeedEmpty />}
    />
  );
}

const styles = StyleSheet.create({
  topContents: {
    marginTop: 32,
    marginBottom: 20,
  },
  profile: {
    gap: 16,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  list: {
    paddingBottom: 100,
  },
  separator: {
    marginVertical: 40,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
});
