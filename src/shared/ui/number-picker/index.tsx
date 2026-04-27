import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";

import { colors } from "@theme/token";

import AppText from "../app-text";

interface NumberPickerProps {
  values: number[];
  value: number;
  onChange: (value: number) => void;
  itemWidth?: number;
  itemHeight?: number;
  isInfinite?: boolean;
}

// TODO: 안드로이드 환경에서도 테스트 필요
export default function NumberPicker({
  values,
  value,
  onChange,
  itemWidth = 24,
  itemHeight = 32,
  isInfinite = false,
}: NumberPickerProps) {
  const listRef = useRef<FlatList<number>>(null);

  const REPEAT_COUNT = 100; // 배열 반복 횟수. 무한 배열로 보이기 위함
  const CONTAINER_HEIGHT = itemHeight * 3; // 전체 컨테이너 높이

  const data = useMemo(() => {
    if (!isInfinite) {
      return values;
    }

    return Array.from({ length: REPEAT_COUNT }).flatMap(() => values);
  }, [values, isInfinite]);

  const initialIndex = useMemo(() => {
    const valueIndex = values.findIndex((item) => item === value);
    const safeValueIndex = Math.max(0, valueIndex);

    if (!isInfinite) {
      return safeValueIndex;
    }

    const middleRepeatIndex = Math.floor(REPEAT_COUNT / 2);
    return middleRepeatIndex * values.length + safeValueIndex;
  }, [values, value, isInfinite]);

  useEffect(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({
        offset: initialIndex * itemHeight,
        animated: false,
      });
    });
  }, [initialIndex, itemHeight]);

  const getRealValue = (index: number) => {
    if (!isInfinite) {
      return values[index];
    }

    return values[index % values.length];
  };

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemHeight);

    const nextValue = getRealValue(index);

    if (nextValue === undefined) {
      return;
    }

    if (nextValue !== value) {
      onChange(nextValue);
    }

    if (!isInfinite) {
      return;
    }

    const valueIndex = values.findIndex((item) => item === nextValue);
    const resetIndex =
      Math.floor(REPEAT_COUNT / 2) * values.length + valueIndex;

    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({
        offset: resetIndex * itemHeight,
        animated: false,
      });
    });
  };

  return (
    <View
      style={[styles.wrapper, { width: itemWidth, height: CONTAINER_HEIGHT }]}
    >
      <View
        pointerEvents="none"
        style={[
          styles.selectedBox,
          {
            height: itemHeight,
            top: (CONTAINER_HEIGHT - itemHeight) / 2,
            width: itemWidth,
          },
        ]}
      />

      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        bounces={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        contentContainerStyle={{
          paddingVertical: (CONTAINER_HEIGHT - itemHeight) / 2,
        }}
        renderItem={({ item }) => {
          const isSelected = item === value;

          return (
            <View style={[styles.item, { height: itemHeight }]}>
              <AppText
                weight={isSelected ? "medium" : "regular"}
                size="xs"
                color={isSelected ? colors.white : colors.grey[200]}
              >
                {item}
              </AppText>
            </View>
          );
        }}
      />

      <LinearGradient
        pointerEvents="none"
        colors={[colors.black.main, "rgba(18,18,18,0)"]}
        locations={[0, 1]}
        style={[
          styles.fadeOverlay,
          {
            top: 0,
            height: itemHeight,
          },
        ]}
      />

      <LinearGradient
        pointerEvents="none"
        colors={["rgba(18,18,18,0)", colors.black.main]}
        locations={[0, 1]}
        style={[
          styles.fadeOverlay,
          {
            bottom: 0,
            height: itemHeight,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedBox: {
    position: "absolute",
    borderRadius: 4,
    backgroundColor: colors.darkgrey.main,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  fadeOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 2,
  },
});
