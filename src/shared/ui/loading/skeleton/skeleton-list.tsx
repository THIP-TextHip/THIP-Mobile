import { Fragment, type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { SkeletonProvider } from "./skeleton-provider";

interface SkeletonListProps {
  count: number;
  renderItem: (index: number) => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  separator?: ReactNode;
}

/**
 * 목록 스켈레톤의 공통 껍데기. 아이템을 count만큼 반복하고 하나의 SkeletonProvider로 감싸
 * 조각이 몇 개든 애니메이션은 하나만 돌게 한다.
 */
export function SkeletonList({
  count,
  renderItem,
  containerStyle,
  separator,
}: SkeletonListProps) {
  return (
    <SkeletonProvider>
      <View style={containerStyle}>
        {Array.from({ length: count }, (_, index) => (
          <Fragment key={index}>
            {index > 0 && separator}
            {renderItem(index)}
          </Fragment>
        ))}
      </View>
    </SkeletonProvider>
  );
}
