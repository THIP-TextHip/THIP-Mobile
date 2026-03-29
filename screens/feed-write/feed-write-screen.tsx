import { ScrollView, StyleSheet, View } from "react-native";

import { BookSearchBottomSheet } from "@shared/ui";
import { colors } from "@theme/token";

import { useState } from "react";
import {
  BookSelectSection,
  FeedContentSection,
  FeedWriteHeader,
} from "./components";

export default function FeedWriteScreen() {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [content, setContent] = useState("");

  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const Separator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.page}>
      <FeedWriteHeader disabled={true} handleConfirm={() => {}} />
      <ScrollView contentContainerStyle={styles.content}>
        <BookSelectSection handleOpenBottomSheet={handleOpenBottomSheet} />
        <Separator />
        <FeedContentSection
          content={content}
          handleChangeContent={setContent}
        />
        <Separator />
      </ScrollView>
      <BookSearchBottomSheet
        isVisible={isBottomSheetVisible}
        handleClose={handleCloseBottomSheet}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 32,
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkgrey.dark,
  },
});
