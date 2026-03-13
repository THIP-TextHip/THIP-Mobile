import { FlatList, StyleSheet, View } from "react-native";

import {
  FeedPostPreview,
  ListTotalCountHeader,
  ThipPreview,
  UserProfile,
} from "@shared/ui";
import { colors } from "@theme/token";

// TODO: 서버에서 가져오기
import { DUMMY_MY_FEED_PREVIEW_LIST, DUMMY_THIP_LIST } from "../../constants";
import MyFeedEmpty from "../my-feed-empty";

// TODO: 서버에서 받아오기
const nickname = "ThipUser01";
const genre = "문학가";
const profileColor = colors.character.mint;

const MyFeedTopContents = () => {
  return (
    <View style={styles.topContents}>
      <View style={styles.profile}>
        <UserProfile userProfile={{ nickname, genre, profileColor }} />
        <ThipPreview thipList={DUMMY_THIP_LIST} />
      </View>
      <ListTotalCountHeader length={DUMMY_MY_FEED_PREVIEW_LIST.length} />
    </View>
  );
};

export default function MyFeedContents() {
  return (
    <View style={styles.content}>
      {DUMMY_MY_FEED_PREVIEW_LIST.length === 0 ? (
        <>
          <MyFeedTopContents />
          <MyFeedEmpty />
        </>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          ListHeaderComponent={() => <MyFeedTopContents />}
          data={DUMMY_MY_FEED_PREVIEW_LIST}
          keyExtractor={(item) => String(item.feedId)}
          renderItem={({ item }) => <FeedPostPreview feedPreview={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
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
