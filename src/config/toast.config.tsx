import { StyleSheet, View } from "react-native";
import { BaseToast, BaseToastProps } from "react-native-toast-message";

import { AppText } from "../shared/ui";
import { colors } from "../theme/token";

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "pink" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: BaseToastProps) => (
    <View style={styles.container}>
      <AppText weight="medium" size="xs" color={colors.red}>
        {props.text1}
      </AppText>
    </View>
  ),

  // Thip 기본 토스트
  default: (props: BaseToastProps) => (
    <View style={styles.container}>
      <AppText
        weight="medium"
        size="xs"
        color={colors.white}
        style={{ lineHeight: 20 }}
      >
        {props.text1}
      </AppText>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    padding: 12,
    backgroundColor: colors.darkgrey.dark,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey[300],
  },
});
