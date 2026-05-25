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

import { CreateVoteHeader, VoteContentSection } from "./components";
import { DUMMY_RECORD_BOOK_STATE } from "./constants";

export default function CreateVoteScreen() {
  const { roomId } = useLocalSearchParams();
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { prevRecord, clearPrevRecord } = usePrevRecordStore();

  const [recordPage, setRecordPage] = useState(
    prevRecord ? prevRecord.page : DUMMY_RECORD_BOOK_STATE.recentBookPage,
  );
  const [isOverview, setIsOverview] = useState(
    prevRecord ? prevRecord.isOverview : false,
  );
  const [isImpossiblePage, setIsImpossiblePage] = useState(false);
  const [content, setContent] = useState(prevRecord ? prevRecord.content : "");
  const [voteItemList, setVoteItemList] = useState<{ itemName: string }[]>(
    prevRecord ? prevRecord.voteItems : [{ itemName: "" }, { itemName: "" }],
  );

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
  const handleComplete = () => {
    if (prevRecord === null) {
      console.log(
        "투표 작성",
        roomId,
        recordPage,
        isOverview,
        content,
        cleanedVoteItemList,
      );
      router.back();
    } else {
      console.log(
        "투표 수정",
        roomId,
        prevRecord.postId,
        content,
        cleanedVoteItemList,
      );
      clearPrevRecord();
      router.back();
    }
  };

  const cleanedVoteItemList = voteItemList
    .map(({ itemName }) => ({ itemName: itemName.trim() }))
    .filter(({ itemName }) => itemName.length > 0);

  const disabled =
    isImpossiblePage ||
    content.trim().length === 0 ||
    cleanedVoteItemList.length < 2 ||
    (prevRecord !== null && prevRecord.content.trim() === content.trim());

  return (
    <View style={styles.page}>
      <CreateVoteHeader
        isEdit={prevRecord !== null}
        disabled={disabled}
        handleGoBack={handleGoBack}
        handleComplete={handleComplete}
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
          <VoteContentSection
            editable={prevRecord === null}
            content={content}
            voteItemList={voteItemList}
            handleChangeContent={setContent}
            handleChangeVoteItemList={setVoteItemList}
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
