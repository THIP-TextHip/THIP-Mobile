import { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { IcAlertGrey, IcX, IcXCircleBlack } from "@images/icons";
import { colors, typography } from "@theme/token";

import AppText from "../app-text";
import CustomSwitch from "../custom-switch";

interface RecordPageSectionProps {
  totalPage: number;
  isOverviewPossible: boolean;
  recordPage: number;
  isOverview: boolean;
  handleChangeRecordPage: (page: number) => void;
  handleChangeOverview: () => void;
  handleChangeIsImpossiblePage: (isImpossiblePage: boolean) => void;
}

export default function RecordPageSection({
  totalPage,
  isOverviewPossible,
  recordPage,
  isOverview,
  handleChangeRecordPage,
  handleChangeOverview,
  handleChangeIsImpossiblePage,
}: RecordPageSectionProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleResetRecordPage = () => {
    handleChangeRecordPage(0);
  };

  const handleOpenTooltip = () => {
    setIsTooltipVisible(true);
  };

  const handleCloseTooltip = () => {
    setIsTooltipVisible(false);
  };

  const handleChangeOverviewToggle = () => {
    if (!isOverviewPossible) {
      setIsTooltipVisible(true);
    } else {
      handleChangeOverview();
    }
  };

  const inputWidth = Math.max(
    typography.fontSize.sm * 0.65,
    String(recordPage || "0").length * typography.fontSize.sm * 0.65,
  );

  const isExceeded = recordPage > totalPage && !isOverview;

  useEffect(() => {
    handleChangeIsImpossiblePage(isExceeded);
  }, [isExceeded, handleChangeIsImpossiblePage]);

  return (
    <View style={styles.section}>
      <AppText weight="semibold" size="lg" color={colors.white} lineHeight={24}>
        기록할 페이지
      </AppText>
      <View
        style={[
          styles.inputContainer,
          isExceeded && { borderWidth: 1, borderColor: colors.red },
        ]}
      >
        {isOverview ? (
          <AppText
            weight="regular"
            size="sm"
            color={colors.white}
            lineHeight={24}
          >
            전체범위
          </AppText>
        ) : (
          <>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { width: inputWidth }]}
                keyboardType="number-pad"
                value={String(recordPage)}
                onChangeText={(text) => handleChangeRecordPage(Number(text))}
                selectionColor={colors.neongreen}
                cursorColor={colors.neongreen}
                autoFocus
              />
              <AppText weight="regular" size="sm" color={colors.grey[300]}>
                /{totalPage}p
              </AppText>
            </View>
            <Pressable onPress={handleResetRecordPage} hitSlop={5}>
              <IcXCircleBlack />
            </Pressable>
          </>
        )}
        {isExceeded && (
          <AppText
            style={styles.warning}
            weight="regular"
            size="xs"
            color={colors.red}
          >
            전체페이지를 초과할 수 없어요.
          </AppText>
        )}
      </View>
      <View style={styles.overviewWrapper}>
        {isTooltipVisible && (
          <View style={styles.tooltip}>
            <View style={styles.tooltipTriangle} />
            <AppText
              weight="medium"
              size="xs"
              color={isOverviewPossible ? colors.neongreen : colors.red}
            >
              독서 진행도 80%를 달성해야 평을 작성할 수 있어요.
            </AppText>
            <Pressable onPress={handleCloseTooltip} hitSlop={8}>
              <IcX />
            </Pressable>
          </View>
        )}
        <View style={styles.overviewInfo}>
          <Pressable onPress={handleOpenTooltip} hitSlop={5}>
            <IcAlertGrey />
          </Pressable>
          <AppText weight="regular" size="xs" color={colors.grey[100]}>
            총평
          </AppText>
        </View>
        <CustomSwitch
          isOn={isOverview}
          handleToggleButton={handleChangeOverviewToggle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.dark,
  },
  inputWrapper: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  input: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
  },
  overviewWrapper: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  tooltip: {
    position: "absolute",
    right: -10,
    top: 42,
    zIndex: 10,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.dark,
  },
  tooltipTriangle: {
    position: "absolute",
    right: 70,
    top: -16,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 16,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: colors.darkgrey.dark,
  },
  overviewInfo: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  warning: {
    position: "absolute",
    bottom: -20,
  },
});
