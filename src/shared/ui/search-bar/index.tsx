import { useCallback } from "react";
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

interface SearchBarProps {
  value: string;
  placeholder: string;
  autoFocus?: boolean;
  setValue: (value: string) => void;
  handleSearch: () => void;
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
  const handleDelete = useCallback(() => {
    setValue("");
  }, [setValue]);
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={colors.grey[300]}
        selectionColor={colors.neongreen}
        cursorColor={colors.neongreen}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        autoFocus={autoFocus}
      />
      <View style={styles.buttonWrapper}>
        {!!value.trim() && (
          <Pressable onPress={handleDelete}>
            <IcXCircle />
          </Pressable>
        )}
        <Pressable onPress={handleSearch}>
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
