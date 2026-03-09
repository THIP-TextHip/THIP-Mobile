import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import { FeedPostDetail } from "@shared/ui";

import { FeedDetailBottomSheet, FeedDetailHeader } from "./components";
import { DUMMY_FEED_DETAIL } from "./constants";

export default function FeedDetailScreen() {
  const { feedId } = useLocalSearchParams<{ feedId: string }>();

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handlePressMore = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const handleReport = () => {
    console.log("피드 신고하기");
  };
  const handleToEdit = () => {
    console.log("피드 수정하기");
  };
  const handleDelete = () => {
    console.log("피드 삭제하기");
  };

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
        {/* TODO: 댓글 리스트 및 입력창 구현 예정 */}
        <View style={{ height: 200 }}></View>
      </ScrollView>
      <FeedDetailBottomSheet
        isWriter={false}
        isVisible={isBottomSheetVisible}
        handleCloseBottomSheet={handleCloseBottomSheet}
        handleReport={handleReport}
        handleToEdit={handleToEdit}
        handleDelete={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
