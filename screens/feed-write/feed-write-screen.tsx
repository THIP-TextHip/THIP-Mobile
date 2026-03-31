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
import { FEED_TAG_MAX } from "./constants";

export default function FeedWriteScreen() {
  const { bottom } = useSafeAreaInsets();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const [feedBook, setFeedBook] = useState<BottomSheetBookItemType | null>(
    null,
  );
  const [contentBody, setContentBody] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedTagList, setSelectedTagList] = useState<string[]>([]);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const handleImageUrls = (images: string[]) => {
    setImageUrls(images);
  };

  const handlePressTag = (tag: string) => {
    setSelectedTagList((prev) =>
      prev.includes(tag)
        ? prev.filter((item) => item !== tag)
        : prev.length !== FEED_TAG_MAX
          ? [...prev, tag]
          : [...prev],
    );
  };

  const handleDeleteTag = (tag: string) => {
    setSelectedTagList((prev) => prev.filter((item) => item !== tag));
  };

  // TODO: 작성 정보 서버에 보내도록
  const handleConfirmFeedWrite = () => {
    alert(
      `책 : ${feedBook?.bookTitle}\n글 : ${contentBody}\n사진 : ${imageUrls}\n공개 설정 : ${isPublic}\n태그 : ${selectedTagList}`,
    );
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
          contentContainerStyle={[
            styles.content,
            { paddingBottom: bottom + 20 },
          ]}
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
          <FeedTagSection
            selectedTagList={selectedTagList}
            handlePressTag={handlePressTag}
            handleDeleteTag={handleDeleteTag}
          />
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
