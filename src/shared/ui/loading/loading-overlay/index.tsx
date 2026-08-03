import { BlurView } from "expo-blur";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import LoadingIndicator from "../loading-indicator";

interface LoadingOverlayProps {
  /** mutation 진행 여부. 화면을 덮어 조작을 막는다. */
  visible: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function LoadingOverlay({
  visible,
  containerStyle,
}: LoadingOverlayProps) {
  if (!visible) {
    return null;
  }

  return (
    <BlurView
      intensity={12}
      tint="dark"
      style={[styles.overlay, containerStyle]}
    >
      <LoadingIndicator variant="page" />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
