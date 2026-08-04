import { useEffect, useRef, useState } from "react";

/** 이 시간 안에 로딩이 끝나면 아무것도 보여주지 않는다. */
const DEFAULT_DELAY = 200;
/** 한 번 보여줬으면 최소 이만큼은 유지한다. */
const DEFAULT_MIN_DURATION = 500;

interface UseDelayedLoadingOptions {
  delay?: number;
  minDuration?: number;
}

// 200ms 안에 로딩이 끝나면 스켈레톤을 보여주지 않고, 210ms정도로 로딩이 끝나면 스켈레톤이 깜빡거리게 보인다. 이를 해결하기 위해 일부로 지연시간을 추가한다. UX를 위한 일
export const useDelayedLoading = (
  isLoading: boolean,
  {
    delay = DEFAULT_DELAY,
    minDuration = DEFAULT_MIN_DURATION,
  }: UseDelayedLoadingOptions = {},
) => {
  const [isVisible, setIsVisible] = useState(false);
  const shownAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      if (isVisible) {
        return;
      }

      const showTimer = setTimeout(() => {
        shownAtRef.current = Date.now();
        setIsVisible(true);
      }, delay);

      return () => clearTimeout(showTimer);
    }

    if (!isVisible) {
      return;
    }

    const shownAt = shownAtRef.current;
    const elapsed = shownAt === null ? minDuration : Date.now() - shownAt;
    const remaining = Math.max(0, minDuration - elapsed);

    const hideTimer = setTimeout(() => {
      shownAtRef.current = null;
      setIsVisible(false);
    }, remaining);

    return () => clearTimeout(hideTimer);
  }, [isLoading, isVisible, delay, minDuration]);

  return isVisible;
};
