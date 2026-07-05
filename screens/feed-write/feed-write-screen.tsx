import { router, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useWriteFeedMutation } from "@apis/feed";
import {
  BookSearchBottomSheet,
  BookSelectSection,
  type BottomSheetBookItemType,
  VisibilitySection,
} from "@shared/ui";
import { useRecordBookPinStore } from "@stores/record-book";
import { useSelectedBookStore } from "@stores/selected-book";
import { colors } from "@theme/token";

import {
  FeedContentSection,
  FeedImageSection,
  FeedTagSection,
  FeedWriteHeader,
} from "./components";
import { FEED_TAG_MAX } from "./constants";

export default function FeedWriteScreen() {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { pinInfo, clearPinInfo } = useRecordBookPinStore();
  const { selectedBookInfo, clearSelectedBookInfo } = useSelectedBookStore();
  const { writeFeed, isPendingWriteFeed } = useWriteFeedMutation();

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [feedBook, setFeedBook] = useState<BottomSheetBookItemType | null>(
    pinInfo?.bookInfo ?? selectedBookInfo ?? null,
  );
  const [contentBody, setContentBody] = useState(pinInfo?.content ?? "");
  const [isPublic, setIsPublic] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedTagList, setSelectedTagList] = useState<string[]>([]);

  useEffect(() => {
    return navigation.addListener("beforeRemove", () => {
      clearPinInfo();
      clearSelectedBookInfo();
    });
  }, [clearPinInfo, clearSelectedBookInfo, navigation]);

  const handleGoBack = useCallback(() => {
    clearPinInfo();
    clearSelectedBookInfo();
    router.back();
  }, [clearPinInfo, clearSelectedBookInfo]);

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
        : prev.length < FEED_TAG_MAX
          ? [...prev, tag]
          : [...prev],
    );
  };

  const handleDeleteTag = (tag: string) => {
    setSelectedTagList((prev) => prev.filter((item) => item !== tag));
  };

  const handleConfirmFeedWrite = () => {
    if (!feedBook) {
      return;
    }

    writeFeed(
      {
        isbn: feedBook.isbn,
        contentBody: contentBody.trim(),
        isPublic,
        tagList: selectedTagList,
        imageUris: imageUrls,
      },
      {
        onSuccess: () => {
          clearPinInfo();
          clearSelectedBookInfo();
          router.back();
        },
      },
    );
  };

  const Separator = () => {
    return <View style={styles.separator} />;
  };

  const confirmDisable =
    !feedBook || contentBody.trim() === "" || isPendingWriteFeed;

  return (
    <View style={styles.page}>
      <FeedWriteHeader
        disabled={confirmDisable}
        handleGoBack={handleGoBack}
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
            isAlreadySelected={pinInfo !== null || selectedBookInfo !== null}
            book={feedBook}
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
          <VisibilitySection
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
    paddingVertical: 20,
    gap: 32,
  },
  separator: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: colors.darkgrey.dark,
  },
});
