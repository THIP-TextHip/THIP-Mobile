import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import { FeedPostDetail } from "@/src/shared/ui";
import { FeedDetailHeader } from "./components";
import { DUMMY_FEED_DETAIL } from "./constants";

export default function FeedDetailScreen() {
  const { feedId } = useLocalSearchParams<{ feedId: string }>();

  const handlePressMore = () => {};

  useEffect(() => {
    if (!feedId) {
      Toast.show({
        type: "error",
        text1: "해당 피드가 존재하지 않습니다.",
      });
      router.back();
    }
  }, [feedId]);

  return (
    <View style={styles.page}>
      <FeedDetailHeader handlePressMore={handlePressMore} />
      <ScrollView>
        <FeedPostDetail feedDetail={DUMMY_FEED_DETAIL} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
