import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { IcDownmoreGrey } from "@images/icons";
import { AppText, DropdownFilter, FilterType, SelectChip } from "@shared/ui";
import { colors } from "@theme/token";

import { GROUP_RECORD_SORT } from "../../constants";

export default function RecordBookFilter() {
  const [selectedChip, setSelectedChip] = useState<"page" | "overview" | null>(
    null,
  );
  const [sortType, setSortType] = useState<FilterType>(GROUP_RECORD_SORT[0]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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

  return (
    <View style={styles.container}>
      <View style={styles.chipWrapper}>
        {/* TODO: 페이지별 보기 필터 칩 구현 */}
        <SelectChip
          label="페이지별 보기"
          isSelected={selectedChip === "overview"}
          handleSelect={handleSelectOverview}
        />
        <SelectChip
          label="총평 보기"
          isSelected={selectedChip === "overview"}
          handleSelect={handleSelectOverview}
        />
      </View>
      <View style={styles.sort}>
        <Pressable
          style={styles.dropdownWrapper}
          onPress={handlePressDropdown}
          hitSlop={5}
        >
          <AppText
            weight="medium"
            size="sm"
            color={colors.grey[100]}
            lineHeight={24}
          >
            {sortType.label}
          </AppText>

          <IcDownmoreGrey />
        </Pressable>
        <DropdownFilter
          isVisible={isDropdownVisible}
          currentType={sortType}
          typeList={GROUP_RECORD_SORT}
          handleSelectType={handleSelectType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chipWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  sort: {
    alignItems: "flex-end",
    marginBottom: 4,
    zIndex: 10,
    elevation: 10,
  },
  dropdownWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
