import { StyleSheet, View } from "react-native";
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";

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
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),

  // Thip 기본 토스트
  default: (props: BaseToastProps) => (
    <View style={styles.container}>
      <AppText weight="medium" size="xs" color={colors.white}>
        {props.text1}
      </AppText>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    padding: 12,
    boxSizing: "border-box",
    backgroundColor: colors.darkgrey.dark,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey[300],
  },
});
