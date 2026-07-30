import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Modal,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import { ThipLogo } from "@images/thip";
import { colors } from "@theme/token";

export default function LoginLoading() {
  const { width } = useWindowDimensions();
  const bounceProgress = useRef(new Animated.Value(0)).current;

  const splashWidth = width * 0.64;
  const splashHeight = splashWidth * 0.25;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceProgress, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
          isInteraction: false,
        }),
        Animated.timing(bounceProgress, {
          toValue: 0,
          duration: 700,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
          isInteraction: false,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [bounceProgress]);

  const animatedStyle = {
    transform: [
      {
        translateY: bounceProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -6],
        }),
      },
      {
        scale: bounceProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.035],
        }),
      },
    ],
  };

  return (
    <Modal
      visible
      animationType="fade"
      presentationStyle="fullScreen"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={() => undefined}
    >
      <View style={styles.container}>
        <Animated.Image
          source={ThipLogo}
          accessibilityRole="progressbar"
          accessibilityLabel="로그인 처리 중"
          style={[{ width: splashWidth, height: splashHeight }, animatedStyle]}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black.main,
    justifyContent: "center",
    alignItems: "center",
  },
});
