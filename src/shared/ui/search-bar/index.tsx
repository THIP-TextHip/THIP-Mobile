import { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

import { IcSearch, IcXCircle } from "@images/icons";
import { colors, typography } from "@theme/token";

const SEARCH_DEBOUNCE_DELAY = 300;

interface SearchBarProps {
  value: string;
  placeholder: string;
  autoFocus?: boolean;
  setValue: (value: string) => void;
  handleSearch?: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function SearchBar({
  value,
  placeholder,
  autoFocus = false,
  setValue,
  handleSearch,
  containerStyle,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (inputValue === value) {
      return;
    }

    const timer = setTimeout(() => {
      setValue(inputValue);
    }, SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [inputValue, setValue, value]);

  const handleDelete = useCallback(() => {
    setInputValue("");
    setValue("");
  }, [setValue]);

  const handleSubmit = useCallback(() => {
    setValue(inputValue);
    handleSearch?.(inputValue);
  }, [handleSearch, inputValue, setValue]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder={placeholder}
        placeholderTextColor={colors.grey[300]}
        selectionColor={colors.neongreen}
        cursorColor={colors.neongreen}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
        autoFocus={autoFocus}
        hitSlop={10}
      />
      <View style={styles.buttonWrapper}>
        {inputValue.length > 0 && (
          <Pressable onPress={handleDelete}>
            <IcXCircle />
          </Pressable>
        )}
        <Pressable onPress={handleSubmit}>
          <IcSearch />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.main,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
