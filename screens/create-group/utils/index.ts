import { getKoreaDate, parseStringToDate } from "@shared/utils";
import { DAY_IN_MS } from "../constants";

export const getDurationErrorMessage = (startDate: string, endDate: string) => {
  const today = getKoreaDate();
  const parsedStartDate = parseStringToDate(startDate);
  const parsedEndDate = parseStringToDate(endDate);

  if (!parsedStartDate || !parsedEndDate)
    return "오류가 발생했습니다. 재시도 해주세요.";

  if (parsedStartDate <= today || parsedEndDate <= today)
    return "모임 기간은 오늘 이후부터 설정 가능합니다.";

  if (parsedEndDate <= parsedStartDate)
    return "종료일은 시작일 다음 날부터 선택할 수 있어요.";

  const durationDays =
    (parsedEndDate.getTime() - parsedStartDate.getTime()) / DAY_IN_MS;

  if (durationDays > 90) return "모임 기간은 최대 90일 까지 설정 가능합니다.";

  return null;
};
