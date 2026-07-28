import { BlurView } from "expo-blur";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import {
  useCreateRoomRecordMutation,
  useEditRoomRecordMutation,
  useGetRoomBookPageQuery,
} from "@apis/room-post";
import { RecordPageSection } from "@shared/ui";
import { usePrevRecordStore } from "@stores/record-book";
import { colors } from "@theme/token";

import { RecordWriteContentSection, RecordWriteHeader } from "./components";

export default function RecordWriteScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { prevRecord, clearPrevRecord } = usePrevRecordStore();

  const [recordPage, setRecordPage] = useState(
    prevRecord ? prevRecord.page : 0,
  );
  const [isOverview, setIsOverview] = useState(
    prevRecord ? prevRecord.isOverview : false,
  );
  const [isImpossiblePage, setIsImpossiblePage] = useState(false);
  const [content, setContent] = useState(prevRecord ? prevRecord.content : "");

  const {
    bookPageInfo,
    isPendingBookPageInfo,
    isErrorBookPageInfo,
    bookPageInfoError,
  } = useGetRoomBookPageQuery(roomId);
  const { createRoomRecord, isPendingCreateRoomRecord } =
    useCreateRoomRecordMutation();
  const { editRoomRecord, isPendingEditRoomRecord } =
    useEditRoomRecordMutation();

  useEffect(() => {
    return navigation.addListener("beforeRemove", clearPrevRecord);
  }, [clearPrevRecord, navigation]);

  useEffect(() => {
    if (prevRecord === null && bookPageInfo?.recentBookPage)
      setRecordPage(bookPageInfo?.recentBookPage);
  }, [prevRecord, bookPageInfo]);

  const handleChangeOverview = () => {
    setIsOverview((prev) => !prev);
  };

  const handleGoBack = useCallback(() => {
    clearPrevRecord();
    router.back();
  }, [clearPrevRecord]);

  const handleCompleteWrite = () => {
    if (isPendingCreateRoomRecord || isPendingEditRoomRecord) return;

    if (prevRecord === null) {
      createRoomRecord({
        roomId,
        page: recordPage,
        isOverview,
        content,
      });
    } else {
      editRoomRecord(
        { roomId, recordId: prevRecord.postId, content },
        { onSuccess: () => clearPrevRecord() },
      );
    }
  };

  const disabled =
    isImpossiblePage ||
    content.trim().length === 0 ||
    (prevRecord !== null && prevRecord.content.trim() === content.trim()) ||
    isPendingBookPageInfo ||
    isPendingCreateRoomRecord ||
    isPendingEditRoomRecord;

  useEffect(() => {
    if (!roomId) {
      Toast.show({
        type: "error",
        text1: "잘못된 접근이에요. 다시 시도해 주세요.",
      });
      router.back();

      return;
    }
  }, [roomId]);

  useEffect(() => {
    if (isErrorBookPageInfo) {
      Toast.show({
        type: "error",
        text1: bookPageInfoError?.message,
      });
      router.back();

      return;
    }
  }, [isErrorBookPageInfo, bookPageInfoError?.message]);

  if (isPendingBookPageInfo) {
    return (
      <View style={styles.status}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  if (!roomId || !bookPageInfo) return null;

  return (
    <View style={styles.page}>
      <RecordWriteHeader
        isEdit={prevRecord !== null}
        disabled={disabled}
        handleGoBack={handleGoBack}
        handleComplete={handleCompleteWrite}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: bottom + 40 },
            prevRecord !== null && { gap: 70 },
          ]}
        >
          <RecordPageSection
            editable={prevRecord === null}
            totalPage={bookPageInfo?.totalBookPage}
            isOverviewPossible={bookPageInfo?.isOverviewPossible}
            recordPage={recordPage}
            isOverview={isOverview}
            handleChangeRecordPage={setRecordPage}
            handleChangeOverview={handleChangeOverview}
            handleChangeIsImpossiblePage={setIsImpossiblePage}
          />
          <RecordWriteContentSection
            content={content}
            handleChangeContent={setContent}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {(isPendingCreateRoomRecord || isPendingEditRoomRecord) && (
        <BlurView intensity={12} tint="dark" style={styles.linearBlur}>
          <ActivityIndicator size="large" color={colors.white} />
        </BlurView>
      )}
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
    paddingVertical: 32,
    paddingHorizontal: 20,
    gap: 32,
  },
  status: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linearBlur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
