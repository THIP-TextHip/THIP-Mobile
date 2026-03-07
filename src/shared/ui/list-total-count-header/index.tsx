import { StyleSheet, View } from "react-native";

import { colors } from "@theme/token";

import AppText from "../app-text";

interface ListTotalCountHeaderProps {
  length: number;
}

export default function ListTotalCountHeader({
  length,
}: ListTotalCountHeaderProps) {
  return (
    <View style={styles.entireCount}>
      <AppText weight="medium" size="sm" color={colors.grey[100]}>
        전체 {length}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  entireCount: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkgrey.dark,
    marginHorizontal: 20,
  },
});
