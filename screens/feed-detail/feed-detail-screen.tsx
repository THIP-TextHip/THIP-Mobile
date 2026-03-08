import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { FeedDetailHeader } from "./components";

export default function FeedDetailScreen() {
  const { feedId } = useLocalSearchParams<{ feedId: string }>();

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
      <FeedDetailHeader handlePressMore={() => {}} />
      <AppText color={colors.white}>피드 상세 페이지 {feedId}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
