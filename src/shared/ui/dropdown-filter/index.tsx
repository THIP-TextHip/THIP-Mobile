import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { colors } from "@theme/token";

import AppText from "../app-text";

export interface FilterType<T extends string = string> {
  label: string;
  type: T;
}

interface DropdownFilterProps<T extends string = string> {
  isVisible: boolean;
  currentType: FilterType<T>;
  typeList: FilterType<T>[];
  handleSelectType: (type: FilterType<T>) => void;
}

export default function DropdownFilter<T extends string = string>({
  isVisible,
  currentType,
  typeList,
  handleSelectType,
}: DropdownFilterProps<T>) {
  return (
    isVisible && (
      <View style={styles.container}>
        {typeList.map((item) => (
          <Pressable
            key={item.type}
            style={styles.text}
            onPress={() => handleSelectType(item)}
            hitSlop={10}
          >
            <AppText
              weight="regular"
              size="sm"
              color={
                item.type === currentType.type ? colors.white : colors.grey[300]
              }
              lineHeight={20}
            >
              {item.label}
            </AppText>
          </Pressable>
        ))}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 36,
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 12,
    gap: 16,
    backgroundColor: colors.black.main,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.grey[100],
  },
  text: {
    width: 120,
  },
});
