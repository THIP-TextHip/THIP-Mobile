import { BlurView } from "expo-blur";
import { Modal, StyleProp, StyleSheet, ViewStyle } from "react-native";

import LoadingIndicator from "../loading-indicator";

const DEFAULT_LABEL = "처리 중이에요";

interface LoadingOverlayProps {
  /** mutation 진행 여부. 화면을 덮어 조작을 막는다. */
  visible: boolean;
  /** 스크린리더가 읽어줄 진행 상황. 화면마다 하는 일이 다르므로 넘겨주는 것이 좋다. */
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Modal로 감싸는 이유는 접근성이다. absoluteFill View만으로는 터치는 막아도
 * 스크린리더(VoiceOver/TalkBack)가 배경 요소를 계속 탐색할 수 있다.
 * Modal은 네이티브 뷰 계층이 분리되어 포커스가 오버레이 안에 갇힌다.
 */
export default function LoadingOverlay({
  visible,
  label = DEFAULT_LABEL,
  containerStyle,
}: LoadingOverlayProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      // 진행 중에는 안드로이드 뒤로가기로 닫히면 안 된다.
      onRequestClose={() => undefined}
    >
      <BlurView
        intensity={12}
        tint="dark"
        style={[styles.overlay, containerStyle]}
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={label}
      >
        <LoadingIndicator variant="page" />
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
