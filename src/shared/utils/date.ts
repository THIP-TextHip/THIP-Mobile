export const getFormattedCurrentDateTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}년 ${month}월 ${date}일 ${hours}시 ${minutes}분`;
};

export const getKoreaDate = (): Date => {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const getPart = (type: Intl.DateTimeFormatPartTypes) => {
    const part = parts.find((part) => part.type === type);
    return Number(part?.value);
  };

  return new Date(
    getPart("year"),
    getPart("month") - 1,
    getPart("day"),
    getPart("hour"),
    getPart("minute"),
    getPart("second"),
  );
};

export const getCurrentDate = () => {
  const now = getKoreaDate();

  return {
    currentYear: now.getFullYear(),
    currentMonth: now.getMonth() + 1,
    currentDay: now.getDate(),
  };
};

export const getDaysList = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) => index + 1);
};
