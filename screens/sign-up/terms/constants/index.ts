import { TERMS_URL } from "@shared/constants";

export const TERMS_AGREEMENT_ID = {
  service: "service",
  privacy: "privacy",
} as const;

export type TermsAgreementId =
  (typeof TERMS_AGREEMENT_ID)[keyof typeof TERMS_AGREEMENT_ID];

export type TermsAgreements = Record<TermsAgreementId, boolean>;

export interface TermsAgreementItem {
  id: TermsAgreementId;
  label: string;
  url: string;
}

export const TERMS_AGREEMENT_LIST: TermsAgreementItem[] = [
  {
    id: TERMS_AGREEMENT_ID.service,
    label: "[필수] 이용약관",
    url: TERMS_URL.SERVICE,
  },
  {
    id: TERMS_AGREEMENT_ID.privacy,
    label: "[필수] 개인정보처리방침",
    url: TERMS_URL.PRIVACY,
  },
];

export const INITIAL_TERMS_AGREEMENTS: TermsAgreements = {
  [TERMS_AGREEMENT_ID.service]: false,
  [TERMS_AGREEMENT_ID.privacy]: false,
};
