# MyGroupCarousel 무한 스크롤 설계

## 목표

`MyGroupCarousel`의 순환 동작은 유지하면서 사용자가 마지막 카드에 도달하기 전에 다음 커서 페이지를 가져온다. 초기 로딩 외의 백그라운드 로딩 상태는 별도 인디케이터로 노출하지 않는다.

## 현재 구조

- `useGetHomeMyRoomQuery`가 `useInfiniteQuery`로 페이지를 조회하고 모든 `roomList`를 하나의 `homeMyRoomData` 배열로 합친다.
- `MyGroupCarousel`은 `react-native-reanimated-carousel`의 `loop` 옵션을 사용한다.
- `handleLoadMore`는 `hasNextPage`와 `isFetchingNextPage`로 불필요하거나 중복된 요청을 차단하지만 아직 캐러셀 이벤트에 연결되지 않았다.

## 설계

캐러셀의 `onSnapToItem` 콜백에서 활성 카드의 인덱스를 받는다. 마지막 카드까지 남은 카드 수를 `homeMyRoomData.length - 1 - index`로 계산하고, 남은 카드가 2개 이하일 때 `handleLoadMore`를 호출한다.

`handleLoadMore`는 기존 조건을 유지한다.

- 다음 페이지가 없으면 요청하지 않는다.
- 다음 페이지 요청이 진행 중이면 중복 요청하지 않는다.
- 그 외에는 `fetchNextPage`를 호출한다.

새 페이지가 성공적으로 추가되면 React Query가 합쳐진 데이터를 갱신하고 캐러셀은 늘어난 배열을 전달받는다. `loop`는 그대로 유지하므로 마지막 페이지까지 모두 조회한 뒤에도 기존 카드 사이를 순환할 수 있다.

## 로딩 및 오류 처리

- 최초 데이터가 없고 초기 요청 중일 때만 현재의 전체 로딩 인디케이터를 표시한다.
- `isFetchingNextPage`와 `isRefetchingHomeMyRoom`은 별도 인디케이터로 표시하지 않는다.
- 다음 페이지 요청 실패 시 기존에 받은 카드는 유지한다. 이 변경에서 별도의 오류 UI나 자동 재시도 동작은 추가하지 않는다.
- 컴포넌트에서 사용하지 않는 `refetchHomeMyRoom`과 `isRefetchingHomeMyRoom` 구조 분해는 제거한다.

## 검증

- 활성 인덱스가 마지막 카드보다 세 칸 이상 앞이면 다음 페이지를 요청하지 않는다.
- 마지막 카드까지 두 장 이하가 남으면 다음 페이지를 요청한다.
- `hasNextPage`가 거짓이거나 `isFetchingNextPage`가 참이면 요청하지 않는다.
- 데이터가 0개 또는 1개일 때 기존 빈 상태 및 단일 카드 렌더링이 유지된다.
- 린트와 TypeScript 검사를 실행해 콜백 타입과 사용하지 않는 변수가 없는지 확인한다.

## 범위 제외

- 다음 페이지 로딩 카드 또는 로딩 인디케이터 추가
- 자동 재생, 페이지 표시기, 재시도 UI 추가
- API 및 React Query 페이지네이션 구조 변경
