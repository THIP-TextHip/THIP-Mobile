import { create } from "zustand";

interface SignUpAgreementStore {
  /** 약관 동의 화면을 실제로 통과했는지. 딥링크로 이후 화면에 바로 진입하는 것을 막는다. */
  hasAgreedToTerms: boolean;
  agreeToTerms: () => void;
  resetAgreement: () => void;
}

export const useSignUpAgreementStore = create<SignUpAgreementStore>((set) => ({
  hasAgreedToTerms: false,
  agreeToTerms: () => set({ hasAgreedToTerms: true }),
  resetAgreement: () => set({ hasAgreedToTerms: false }),
}));
