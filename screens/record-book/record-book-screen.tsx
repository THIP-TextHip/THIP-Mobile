import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { IcAlertGrey } from "@images/icons";
import { AppText, FilterType } from "@shared/ui";
import { colors } from "@theme/token";

import {
  RecordBookFilter,
  RecordBookFloating,
  RecordBookTopTabBar,
} from "./components";
import { GROUP_RECORD_SORT } from "./constants";

export default function RecordBookScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const [isMyRecord, setIsMyRecord] = useState(false);
  const [selectedChip, setSelectedChip] = useState<"page" | "overview" | null>(
    null,
  );
  const [sortType, setSortType] = useState<FilterType>(GROUP_RECORD_SORT[0]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleGroupRecord = () => {
    setIsMyRecord(false);
  };

  const handleMyRecord = () => {
    setIsMyRecord(true);
  };

  const handleSelectOverview = () => {
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

  const RecordListHeader = () => {
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
      <RecordBookFilter
        selectedChip={selectedChip}
        isDropdownVisible={isDropdownVisible}
        sortType={sortType}
        handleSelectOverview={handleSelectOverview}
        handlePressDropdown={handlePressDropdown}
        handleSelectType={handleSelectType}
      />
      <FlatList
        contentContainerStyle={styles.list}
        data={[1]}
        renderItem={() => <></>}
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
