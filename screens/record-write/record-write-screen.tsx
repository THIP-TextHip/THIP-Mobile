import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RecordPageSection } from "@shared/ui";
import { usePrevRecordStore } from "@stores/record-book";

import { RecordWriteContentSection, RecordWriteHeader } from "./components";
// TODO: 서버에서 받아온 값으로 변경
import { DUMMY_RECORD_BOOK_STATE } from "./constants";

export default function RecordWriteScreen() {
  const { roomId } = useLocalSearchParams();
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { prevRecord, clearPrevRecord } = usePrevRecordStore();

  const [recordPage, setRecordPage] = useState(
    prevRecord ? prevRecord.page : DUMMY_RECORD_BOOK_STATE.recentBookPage,
  );
  const [isOverview, setIsOverview] = useState(false);
  const [isImpossiblePage, setIsImpossiblePage] = useState(false);
  const [content, setContent] = useState(prevRecord ? prevRecord.content : "");

  useEffect(() => {
    return navigation.addListener("beforeRemove", clearPrevRecord);
  }, [clearPrevRecord, navigation]);

  const handleChangeOverview = () => {
    setIsOverview((prev) => !prev);
  };

  const handleGoBack = useCallback(() => {
    clearPrevRecord();
    router.back();
  }, [clearPrevRecord]);

  // TODO: 서버에 api 요청. 성공 시 기록장 페이지 내 기록 탭으로 이동
  const handleCompleteWrite = () => {
    if (prevRecord === null) {
      console.log("기록 작성", roomId, recordPage, isOverview, content);
      router.back();
    } else {
      console.log("기록 수정", roomId, prevRecord.postId, content);
      clearPrevRecord();
      router.back();
    }
  };

  const disabled =
    isImpossiblePage ||
    content.trim().length === 0 ||
    (prevRecord !== null && prevRecord.content === content);

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
            totalPage={DUMMY_RECORD_BOOK_STATE.totalBookPage}
            isOverviewPossible={DUMMY_RECORD_BOOK_STATE.isOverviewPossible}
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
});
