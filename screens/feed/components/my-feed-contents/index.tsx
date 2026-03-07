import { FlatList, Pressable, StyleSheet, View } from "react-native";

import { FloatingFeedWrite } from "@images/icons";
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
  const handleToWriteFeed = () => {
    // TODO: 피드 글 작성 페이지로 이동
    console.log("피드 글 작성하러 가기");
  };
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
      <Pressable style={styles.floating} onPress={handleToWriteFeed}>
        <FloatingFeedWrite />
      </Pressable>
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
    paddingBottom: 120,
  },
  separator: {
    marginVertical: 40,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
  floating: {
    position: "absolute",
    bottom: 32,
    right: 20,
  },
});
