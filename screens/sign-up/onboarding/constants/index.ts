import { ImageSourcePropType } from "react-native";

import {
  OnboardingStep1,
  OnboardingStep2,
  OnboardingStep3,
  OnboardingStep4,
  OnboardingStep5,
  OnboardingStep6,
} from "@/assets/images/thip/onboarding";

export type OnboardingItem = {
  step: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

export const ONBOARDING: OnboardingItem[] = [
  {
    step: 1,
    title: "피드",
    description: "피드에서 책과 독서에 대한 생각을\n자유롭게 나누어 보세요!",
    image: OnboardingStep1,
  },
  {
    step: 2,
    title: "피드",
    description:
      "칭호를 통해 내 독서 취향을 드러내고,\n마음에 드는 유저를 ‘띱’하고 감상을 공유해보세요!",
    image: OnboardingStep2,
  },
  {
    step: 3,
    title: "모임",
    description:
      "모임방에서는 글은 물론 투표 기능을 통해\n감상과 의견을 나눌 수 있어요.!",
    image: OnboardingStep3,
  },
  {
    step: 4,
    title: "모임",
    description:
      "읽고 싶은 책으로 나만의 독서 모임을 만들고,\n독서메이트와 함께 기록을 나눌 수 있어요. ",
    image: OnboardingStep4,
  },
  {
    step: 5,
    title: "Thip+",
    description:
      "기록은 자유롭게, 감상은 방해없이.\n읽지 않은 페이지에 대한 기록은 블라인드되어\n스포일러 걱정없이 몰입할 수 있어요.",
    image: OnboardingStep5,
  },
  {
    step: 6,
    title: "Thip+",
    description:
      "모임방의 인상깊은 기록을\n‘핀하기’로 피드에 다시 공유해보세요.",
    image: OnboardingStep6,
  },
];
