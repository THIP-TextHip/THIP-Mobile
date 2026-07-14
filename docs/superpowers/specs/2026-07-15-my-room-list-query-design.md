# 내 모임방 목록 무한 쿼리 설계

## 목표

`getMyRoomListApi`를 호출하는 `useGetMyRoomListQuery`를 구현한다. 기존 `useSearchRoomQuery`와 동일한 TanStack Query 무한 스크롤 패턴을 사용하고, 사용하는 화면에서는 페이지 구조를 알 필요 없이 평탄화된 내 모임방 목록을 받는다.

## 입력과 캐시

- hook 입력은 cursor를 제외한 `{ type: MyRoomType }`이다.
- query key는 기존 `ROOM_QUERY_KEY.MY_ROOM(type)`을 사용한다.
- `type`별로 독립된 캐시와 pagination 상태를 유지한다.
- 최초 `pageParam`은 `null`이다.

## 데이터 흐름

1. `useInfiniteQuery`의 `queryFn`이 `getMyRoomListApi({ type, cursor: pageParam })`를 호출한다.
2. 마지막 응답의 `isLast`가 `true`이면 다음 페이지를 요청하지 않는다.
3. 마지막 페이지가 아니라면 유효한 `nextCursor`를 다음 `pageParam`으로 사용한다.
4. 수신한 모든 페이지의 `roomList`를 `flatMap`으로 합쳐 `myRoomList`로 반환한다.

## 반환 인터페이스

hook은 다음 값을 반환한다.

- `myRoomList`: 모든 페이지를 합친 `MyRoomListType[]`
- `nextCursor`: 마지막 페이지의 cursor, 없으면 `null`
- `fetchNextPage`
- `hasNextPage`
- `isPendingMyRoomList`
- `isFetchingMyRoomList`
- `isFetchingNextPage`

## 오류 처리

기존 `useSearchRoomQuery`와 동일하게 쿼리 오류가 발생하면 `react-native-toast-message`로 오류 메시지를 표시한다. 오류 객체는 effect 의존성에 포함한다.

## 검증

- 최초 page parameter가 `null`인지 확인한다.
- `isLast`가 `false`이면 `nextCursor`를 반환하고, `true`이면 다음 페이지를 중단하는지 확인한다.
- 여러 페이지의 `roomList`가 순서를 유지하며 하나의 `myRoomList`로 합쳐지는지 확인한다.
- ESLint와 TypeScript 검사를 실행한다.

## 범위 제외

- 공통 cursor pagination hook 추출
- 화면 컴포넌트 연동
- `getMyRoomListApi`, 타입, endpoint, query key 변경
