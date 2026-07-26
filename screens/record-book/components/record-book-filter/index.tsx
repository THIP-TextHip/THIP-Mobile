import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

import { IcCheck, IcDownmoreGrey, IcReset, IcX } from "@images/icons";
import { AppText, DropdownFilter, SelectChip } from "@shared/ui";
import { colors, typography } from "@theme/token";

import { GROUP_RECORD_SORT } from "../../constants";
import type { RoomPostSortTypeWithLabel } from "../../types";

interface RecordBookFilterProps {
  selectedChip: "page" | "overview" | null;
  pageSettingMode: boolean;
  isDropdownVisible: boolean;
  sortType: RoomPostSortTypeWithLabel;
  handlePressPageChip: () => void;
  handleResetPage: () => void;
  handleApplyPage: (start: number | null, end: number | null) => void;
  handlePressOverviewChip: () => void;
  handlePressDropdown: () => void;
  handleSelectType: (type: RoomPostSortTypeWithLabel) => void;
}

export default function RecordBookFilter({
  selectedChip,
  pageSettingMode,
  isDropdownVisible,
  sortType,
  handlePressPageChip,
  handleResetPage,
  handleApplyPage,
  handlePressOverviewChip,
  handlePressDropdown,
  handleSelectType,
}: RecordBookFilterProps) {
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");

  const handleReset = () => {
    setStartPage("");
    setEndPage("");
    handleResetPage();
  };

  const handleApply = () => {
    const start = startPage === "" ? null : Number(startPage);
    const end = endPage === "" ? null : Number(endPage);

    if (
      (startPage !== "" && isNaN(start!)) ||
      (endPage !== "" && isNaN(end!))
    ) {
      Toast.show({
        type: "error",
        text1: "숫자만 입력 가능해요!",
      });
      return;
    }

    if (start !== null && end !== null && start > end) {
      Toast.show({
        type: "error",
        text1: "시작 페이지가 끝 페이지보다 작아야 해요",
      });
      return;
    }

    if ((start !== null && start < 0) || (end !== null && end < 0)) {
      Toast.show({
        type: "error",
        text1: "음수는 입력할 수 없어요",
      });
      return;
    }

    handleApplyPage(start, end);
  };

  const disableToReset = startPage === "" && endPage === "";

  return (
    <View style={styles.container}>
      {pageSettingMode ? (
        <View style={styles.pageSettingContainer}>
          <View style={styles.pageSelectWrapper}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={startPage}
                onChangeText={setStartPage}
                cursorColor={colors.neongreen}
                selectionColor={colors.neongreen}
                keyboardType="number-pad"
              />
            </View>
            <AppText weight="regular" size="sm" color={colors.white}>
              ~
            </AppText>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={endPage}
                onChangeText={setEndPage}
                cursorColor={colors.neongreen}
                selectionColor={colors.neongreen}
                keyboardType="number-pad"
              />
            </View>
            <AppText
              weight="regular"
              size="sm"
              color={colors.white}
              lineHeight={24}
            >
              p
            </AppText>
            <Pressable
              style={[
                styles.button,
                disableToReset && { backgroundColor: colors.grey[300] },
              ]}
              disabled={disableToReset}
              onPress={handleReset}
            >
              <IcReset />
            </Pressable>
          </View>
          <Pressable style={styles.button} onPress={handleApply}>
            <IcCheck />
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.chipWrapper}>
            <Pressable
              style={[
                styles.pageChip,
                selectedChip === "page" && {
                  backgroundColor: colors.purple.main,
                },
              ]}
              onPress={handlePressPageChip}
            >
              <AppText weight="regular" size="sm" color={colors.white}>
                페이지별 보기
              </AppText>
              {selectedChip === "page" && (
                <Pressable hitSlop={5} onPress={handleReset}>
                  <IcX />
                </Pressable>
              )}
            </Pressable>
            <SelectChip
              label="총평 보기"
              isSelected={selectedChip === "overview"}
              handleSelect={handlePressOverviewChip}
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
        </>
      )}
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
  pageSettingContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 4,
    paddingLeft: 12,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    backgroundColor: colors.darkgrey.main,
  },
  pageSelectWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputContainer: {
    width: 40,
    height: 26,
    paddingHorizontal: 4,
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.white,
  },
  input: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.white,
  },
  button: {
    paddingVertical: 2,
    paddingHorizontal: 9,
    borderRadius: 20,
    backgroundColor: colors.purple.main,
  },
  chipWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  pageChip: {
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 20,
    backgroundColor: colors.darkgrey.main,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
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
