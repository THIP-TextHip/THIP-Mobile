import { createContext, useContext, useEffect, type ReactNode } from "react";
import {
  ReduceMotion,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

const PULSE_DURATION = 800;
const PULSE_MIN_OPACITY = 0.45;

const SkeletonPulseContext = createContext<SharedValue<number> | null>(null);

const startPulse = (pulse: SharedValue<number>) => {
  pulse.value = withRepeat(
    withTiming(PULSE_MIN_OPACITY, {
      duration: PULSE_DURATION,
      reduceMotion: ReduceMotion.System,
    }),
    -1,
    true,
  );
};

interface SkeletonProviderProps {
  children: ReactNode;
}

/**
 * 스켈레톤 조각이 몇 개든 애니메이션은 하나만 돌도록 pulse 값을 공유한다.
 * 저사양 기기 성능뿐 아니라, 조각들이 같은 박자로 뛰게 하려는 목적도 있다.
 */
export function SkeletonProvider({ children }: SkeletonProviderProps) {
  const pulse = useSharedValue(1);

  useEffect(() => {
    startPulse(pulse);
  }, [pulse]);

  return (
    <SkeletonPulseContext.Provider value={pulse}>
      {children}
    </SkeletonPulseContext.Provider>
  );
}

/** Provider 밖에서 쓰면 조각이 각자 애니메이션을 돌린다. 조각 하나뿐일 때만 권장. */
export function useSkeletonPulse() {
  const sharedPulse = useContext(SkeletonPulseContext);
  const localPulse = useSharedValue(1);

  useEffect(() => {
    if (sharedPulse) {
      return;
    }

    startPulse(localPulse);
  }, [sharedPulse, localPulse]);

  return sharedPulse ?? localPulse;
}
