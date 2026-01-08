import { ComponentType } from "react";

import {
  IcDocument,
  IcGuide,
  IcHeadset,
  IcNoAlarm,
  IcSave,
  IcVersion,
  IcVoice,
} from "@images/icons";

export interface SettingsItem {
  id: SettingsId;
  label: string;
  icon: ComponentType<{ width?: number; height?: number }>;
}

export const SETTINGS_ID = {
  save: "save",
  alarm: "alarm",
  support: "support",
  notice: "notice",
  policy: "policy",
  guide: "guide",
  version: "version",
} as const;

export type SettingsId = (typeof SETTINGS_ID)[keyof typeof SETTINGS_ID];

export const SETTINGS_MY_ACTIVITY: SettingsItem = {
  id: SETTINGS_ID.save,
  label: "저장",
  icon: IcSave,
};

export const SETTINGS_OTHER: SettingsItem[] = [
  { id: SETTINGS_ID.alarm, label: "알림설정", icon: IcNoAlarm },
  { id: SETTINGS_ID.support, label: "고객센터", icon: IcHeadset },
  { id: SETTINGS_ID.notice, label: "공지사항", icon: IcVoice },
  {
    id: SETTINGS_ID.policy,
    label: "개인정보처리방침 & 이용약관",
    icon: IcDocument,
  },
  { id: SETTINGS_ID.guide, label: "가이드", icon: IcGuide },
  { id: SETTINGS_ID.version, label: "버전", icon: IcVersion },
];
