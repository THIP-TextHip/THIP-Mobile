import { AlarmResponse } from "../types";

export const DUMMY_ALARMS: AlarmResponse[] = [
  {
    notificationId: 1,
    title: "새로운 댓글이 달렸어요!",
    content:
      "@user01 님이 댓글을 달았습니다. ‘어쩌구저ㅏㅓㅏ어닝러ㅏㄴ만머ㅣㅏㅓㄹ안무ㅁㄴㅇㄹ`",
    isChecked: false,
    notificationType: "room",
    postDate: "2시간 전",
  },
  {
    notificationId: 2,
    title: "새로운 구독자가 생겼어요.",
    content: "@user01 님이 구독을 시작했어요!",
    isChecked: false,
    notificationType: "feed",
    postDate: "6시간 전",
  },
  {
    notificationId: 3,
    title: "내 글을 좋아합니다.",
    content: "@user123 님이 내 글에 ‘좋아요’를 눌렀어요.",
    isChecked: true,
    notificationType: "feed",
    postDate: "7시간 전",
  },
  {
    notificationId: 4,
    title: "투표가 시작되었어요!",
    content: "투표제목을 먼저 말해줍니다 그리고 어쩌구저쩌구 vs 저쩌구 저쩌구",
    isChecked: true,
    notificationType: "room",
    postDate: "25시간 전",
  },
  {
    notificationId: 5,
    title: "새로운 댓글이 달렸어요!",
    content:
      "@user01 님이 댓글을 달았습니다. ‘어쩌구저ㅏㅓㅏ어닝러ㅏㄴ만머ㅣㅏㅓㄹ안무ㅁㄴㅇㄹ`",
    isChecked: false,
    notificationType: "room",
    postDate: "3일 전",
  },
  {
    notificationId: 6,
    title: "새로운 구독자가 생겼어요.",
    content: "@user01 님이 구독을 시작했어요!",
    isChecked: false,
    notificationType: "feed",
    postDate: "6일 전",
  },
  {
    notificationId: 7,
    title: "내 글을 좋아합니다.",
    content: "@user123 님이 내 글에 ‘좋아요’를 눌렀어요.",
    isChecked: true,
    notificationType: "feed",
    postDate: "2025.12.30",
  },
  {
    notificationId: 8,
    title: "투표가 시작되었어요!",
    content: "투표제목을 먼저 말해줍니다 그리고 어쩌구저쩌구 vs 저쩌구 저쩌구",
    isChecked: true,
    notificationType: "room",
    postDate: "2025.10.10",
  },
];
