import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { IcAlertGrey } from "@images/icons";
import { AppText, FilterType } from "@shared/ui";
import { colors } from "@theme/token";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  RecordBookFilter,
  RecordBookFloating,
  RecordBookPostItem,
  RecordBookTopTabBar,
} from "./components";
import { DUMMY_RECORD_BOOK_RESPONSE, GROUP_RECORD_SORT } from "./constants";

export default function RecordBookScreen() {
  const { bottom } = useSafeAreaInsets();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const [isMyRecord, setIsMyRecord] = useState(false);
  const [selectedChip, setSelectedChip] = useState<"page" | "overview" | null>(
    null,
  );
  const [pageSettingMode, setPageSettingMode] = useState(false);
  const [selectedPages, setSelectedPages] = useState<{
    start: number | null;
    end: number | null;
  }>({ start: null, end: null });

  const [sortType, setSortType] = useState<FilterType>(GROUP_RECORD_SORT[0]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleGroupRecord = () => {
    setIsMyRecord(false);
  };

  const handleMyRecord = () => {
    setIsMyRecord(true);
  };

  const handlePressPageChip = () => {
    if (selectedChip !== "page") {
      if (selectedPages.start !== null || selectedPages.end !== null) {
        setSelectedChip("page");
        return;
      }
    }
    setPageSettingMode(true);
  };

  const handleResetPage = () => {
    setSelectedPages({ start: null, end: null });
    setPageSettingMode(false);
    setSelectedChip(null);
  };

  const handleApplyPage = (start: number | null, end: number | null) => {
    setPageSettingMode(false);
    setSelectedPages({ start, end });
    if (start === null && end === null) {
      setSelectedChip(null);
      return;
    }
    setSelectedChip("page");
  };

  const handlePressOverviewChip = () => {
    setSelectedChip((prev) => (prev === "overview" ? null : "overview"));
  };

  const handlePressDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSelectType = (type: FilterType) => {
    setSortType(type);
    setIsDropdownVisible(false);
  };

  // TODO: 추후 에러 화면 표시
  if (!roomId || Array.isArray(roomId)) {
    return null;
  }

  // TODO: 추후 서버에서 받아온 리스트로 사용할 예정
  const recordBookPostList = isMyRecord
    ? DUMMY_RECORD_BOOK_RESPONSE.postList.filter((post) => post.isWriter)
    : DUMMY_RECORD_BOOK_RESPONSE.postList;

  const RecordListHeader = () => {
    if (isMyRecord) return null;
    return (
      <View style={styles.listHeader}>
        <IcAlertGrey />
        <AppText weight="regular" size="xs" color={colors.grey[200]}>
          {selectedChip === "page"
            ? "페이지별 보기는 입력한 페이지의 글만 노출됩니다."
            : selectedChip === "overview"
              ? "총평 보기는 스포일러가 포함 될 수도 있습니다."
              : "내 진행도에 따라 일부 댓글은 블러처리됩니다."}
        </AppText>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <RecordBookTopTabBar
        isMyRecord={isMyRecord}
        handleGroupRecord={handleGroupRecord}
        handleMyRecord={handleMyRecord}
      />
      {!isMyRecord && (
        <RecordBookFilter
          selectedChip={selectedChip}
          pageSettingMode={pageSettingMode}
          isDropdownVisible={isDropdownVisible}
          sortType={sortType}
          handlePressPageChip={handlePressPageChip}
          handleResetPage={handleResetPage}
          handleApplyPage={handleApplyPage}
          handlePressOverviewChip={handlePressOverviewChip}
          handlePressDropdown={handlePressDropdown}
          handleSelectType={handleSelectType}
        />
      )}
      <FlatList
        contentContainerStyle={[styles.list, { paddingBottom: bottom + 80 }]}
        data={recordBookPostList}
        keyExtractor={(item) => String(item.postId)}
        renderItem={({ item }) => (
          <RecordBookPostItem roomId={Number(roomId)} post={item} />
        )}
        ListHeaderComponent={RecordListHeader}
      />
      <RecordBookFloating roomId={roomId} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 20,
    gap: 32,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
