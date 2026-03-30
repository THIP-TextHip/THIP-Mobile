import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BookSearchBottomSheet, BottomSheetBookItemType } from "@shared/ui";
import { colors } from "@theme/token";

import {
  BookSelectSection,
  FeedContentSection,
  FeedImageSection,
  FeedTagSection,
  FeedVisibilitySection,
  FeedWriteHeader,
} from "./components";

export default function FeedWriteScreen() {
  const { bottom } = useSafeAreaInsets();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const [feedBook, setFeedBook] = useState<BottomSheetBookItemType | null>(
    null,
  );
  const [contentBody, setContentBody] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const handleImageUrls = (images: string[]) => {
    setImageUrls(images);
  };

  // TODO: 작성 정보 서버에 보내도록
  const handleConfirmFeedWrite = () => {
    console.log("피드 작성 완료");
  };

  const Separator = () => {
    return <View style={styles.separator} />;
  };

  const confirmDisable = !feedBook || contentBody.trim() === "";

  return (
    <View style={styles.page}>
      {/* TODO: 완료 버튼 상태는 필수 정보 입력 여부에 따라 바뀌도록 */}
      <FeedWriteHeader
        disabled={confirmDisable}
        handleConfirm={handleConfirmFeedWrite}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: bottom }]}
        >
          <BookSelectSection
            feedBook={feedBook}
            handleOpenBottomSheet={handleOpenBottomSheet}
          />
          <Separator />
          <FeedContentSection
            contentBody={contentBody}
            handleChangeContentBody={setContentBody}
          />
          <Separator />
          <FeedImageSection
            imageUrls={imageUrls}
            handleImageUrls={handleImageUrls}
          />
          <Separator />
          <FeedVisibilitySection
            isPublic={isPublic}
            handleChangeVisibility={setIsPublic}
          />
          <Separator />
          <FeedTagSection />
        </ScrollView>
      </KeyboardAvoidingView>
      <BookSearchBottomSheet
        isVisible={isBottomSheetVisible}
        handleSelectBook={setFeedBook}
        handleClose={handleCloseBottomSheet}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  keyboardAvoidingView: {
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
