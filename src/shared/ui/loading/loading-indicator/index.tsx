import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { colors } from "@theme/token";

/**
 * page       화면 전체를 차지하는 로딩. 부모가 flex 컨테이너일 때 사용 (early return)
 * list-empty FlatList의 ListEmptyComponent 안에서 사용. 정렬만 담당하고 여백은 갖지 않는다.
 *            contentContainerStyle에 flexGrow가 없으면 flex:1이 무효라 여백으로 위치를 잡아야 하는데,
 *            그 값은 화면(헤더 높이 등)마다 다르므로 containerStyle로 직접 넘긴다.
 * footer     무한스크롤 페이지네이션 푸터
 */
export type LoadingIndicatorVariant = "page" | "list-empty" | "footer";

interface LoadingIndicatorProps {
  variant?: LoadingIndicatorVariant;
  /** 화면마다 다른 여백만 조정한다. 색상/크기는 통일을 위해 열지 않는다. */
  containerStyle?: StyleProp<ViewStyle>;
}

export default function LoadingIndicator({
  variant = "page",
  containerStyle,
}: LoadingIndicatorProps) {
  return (
    <View style={[styles[variant], containerStyle]}>
      <ActivityIndicator
        size={variant === "footer" ? "small" : "large"}
        color={colors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  "list-empty": {
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    marginTop: 40,
  },
});
