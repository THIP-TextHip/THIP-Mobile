import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RecordPageSection } from "@shared/ui";

import { CreateVoteHeader, VoteContentSection } from "./components";
import { DUMMY_RECORD_BOOK_STATE } from "./constants";

export default function CreateVoteScreen() {
  const { bottom } = useSafeAreaInsets();
  const [recordPage, setRecordPage] = useState(
    DUMMY_RECORD_BOOK_STATE.recentBookPage,
  );
  const [isOverview, setIsOverview] = useState(false);
  const [isImpossiblePage, setIsImpossiblePage] = useState(false);
  const [content, setContent] = useState("");
  const [voteItemList, setVoteItemList] = useState<{ itemName: string }[]>([
    { itemName: "" },
    { itemName: "" },
  ]);

  const handleChangeOverview = () => {
    setIsOverview((prev) => !prev);
  };

  // TODO: 서버에 api 요청. 성공 시 기록장 페이지 내 기록 탭으로 이동
  const handleCreateVote = () => {
    console.log(
      "투표 생성",
      recordPage,
      isOverview,
      content,
      cleanedVoteItemList,
    );
    router.back();
  };

  const cleanedVoteItemList = voteItemList.filter(
    (voteItem) => voteItem.itemName !== "",
  );

  const disabled =
    isImpossiblePage ||
    content.trim().length === 0 ||
    cleanedVoteItemList.length < 2;

  return (
    <View style={styles.page}>
      <CreateVoteHeader
        disabled={disabled}
        handleCreateVote={handleCreateVote}
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
          ]}
        >
          <RecordPageSection
            totalPage={DUMMY_RECORD_BOOK_STATE.totalBookPage}
            isOverviewPossible={DUMMY_RECORD_BOOK_STATE.isOverviewPossible}
            recordPage={recordPage}
            isOverview={isOverview}
            handleChangeRecordPage={setRecordPage}
            handleChangeOverview={handleChangeOverview}
            handleChangeIsImpossiblePage={setIsImpossiblePage}
          />
          <VoteContentSection
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
