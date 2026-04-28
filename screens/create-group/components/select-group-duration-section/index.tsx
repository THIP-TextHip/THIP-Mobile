import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppText, NumberPicker } from "@shared/ui";
import { getCurrentDate, getDaysList } from "@shared/utils";
import { colors } from "@theme/token";

const { currentYear, currentMonth, currentDay } = getCurrentDate();

const tomorrow = new Date(currentYear, currentMonth - 1, currentDay + 1);

const YEARS_LIST = [currentYear, currentYear + 1, currentYear + 2];

const MONTHS_LIST = Array.from({ length: 12 }, (_, index) => index + 1);

interface SelectGroupDurationSectionProps {
  startDate: string;
  endDate: string;
  errorMessage: string;
  handleChangeStartDate: (date: string) => void;
  handleChangeEndDate: (date: string) => void;
}

export default function SelectGroupDurationSection({
  startDate,
  endDate,
  errorMessage,
  handleChangeStartDate,
  handleChangeEndDate,
}: SelectGroupDurationSectionProps) {
  const [startYear, setStartYear] = useState(tomorrow.getFullYear());
  const [startMonth, setStartMonth] = useState(tomorrow.getMonth() + 1);
  const [startDay, setStartDay] = useState(tomorrow.getDate());
  const [endYear, setEndYear] = useState(tomorrow.getFullYear());
  const [endMonth, setEndMonth] = useState(tomorrow.getMonth() + 1);
  const [endDay, setEndDay] = useState(tomorrow.getDate());

  const startDaysList = useMemo(
    () => getDaysList(startYear, startMonth),
    [startYear, startMonth],
  );

  const endDaysList = useMemo(
    () => getDaysList(endYear, endMonth),
    [endYear, endMonth],
  );

  useEffect(() => {
    const maxDay = startDaysList[startDaysList.length - 1];
    if (startDay > maxDay) setStartDay(maxDay);
  }, [startDay, startDaysList]);

  useEffect(() => {
    const maxDay = endDaysList[endDaysList.length - 1];
    if (endDay > maxDay) setEndDay(maxDay);
  }, [endDay, endDaysList]);

  useEffect(() => {
    handleChangeStartDate(
      `${startYear}.${String(startMonth).padStart(2, "0")}.${String(startDay).padStart(2, "0")}`,
    );
  }, [startYear, startMonth, startDay, handleChangeStartDate]);

  useEffect(() => {
    handleChangeEndDate(
      `${endYear}.${String(endMonth).padStart(2, "0")}.${String(endDay).padStart(2, "0")}`,
    );
  }, [endYear, endMonth, endDay, handleChangeEndDate]);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
        >
          모임 활동기간
        </AppText>
        <AppText weight="medium" size="xs" color={colors.grey[200]}>
          {startDate} ~ {endDate}
        </AppText>
      </View>
      <View style={styles.content}>
        <View style={styles.itemWrapper}>
          <View style={styles.item}>
            <NumberPicker
              values={YEARS_LIST}
              value={startYear}
              onChange={setStartYear}
              itemWidth={44}
            />
            <AppText weight="regular" size="xs" color={colors.white}>
              년
            </AppText>
          </View>
          <View style={styles.item}>
            <NumberPicker
              values={MONTHS_LIST}
              value={startMonth}
              onChange={setStartMonth}
            />
            <AppText weight="regular" size="xs" color={colors.white}>
              월
            </AppText>
          </View>
          <View style={styles.item}>
            <NumberPicker
              values={startDaysList}
              value={startDay}
              onChange={setStartDay}
            />
            <AppText weight="regular" size="xs" color={colors.white}>
              일
            </AppText>
          </View>
        </View>
        <AppText weight="semibold" size="xs" color={colors.white}>
          ~
        </AppText>
        <View style={styles.itemWrapper}>
          <View style={styles.item}>
            <NumberPicker
              values={YEARS_LIST}
              value={endYear}
              onChange={setEndYear}
              itemWidth={44}
            />
            <AppText weight="regular" size="xs" color={colors.white}>
              년
            </AppText>
          </View>
          <View style={styles.item}>
            <NumberPicker
              values={MONTHS_LIST}
              value={endMonth}
              onChange={setEndMonth}
            />
            <AppText weight="regular" size="xs" color={colors.white}>
              월
            </AppText>
          </View>
          <View style={styles.item}>
            <NumberPicker
              values={endDaysList}
              value={endDay}
              onChange={setEndDay}
            />
            <AppText weight="regular" size="xs" color={colors.white}>
              일
            </AppText>
          </View>
        </View>
      </View>
      <AppText
        style={styles.desc}
        weight="regular"
        size="xs"
        color={errorMessage ? colors.red : colors.neongreen}
      >
        {errorMessage ||
          "모임방 활동이 시작되면, 독서메이트 모집이 자동으로 종료돼요."}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  desc: {
    textAlign: "right",
  },
});
