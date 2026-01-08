import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet } from "react-native";

import { colors } from "@theme/token";

interface CustomSwitchProps {
  isOn: boolean;
  handleToggleButton: () => void;
}

const WIDTH = 46;
const PADDING = 4;
const CIRCLE_WIDTH = 18;

const MAX_TRANSLATE_X = WIDTH - PADDING * 2 - CIRCLE_WIDTH;

export default function CustomSwitch({
  isOn,
  handleToggleButton,
}: CustomSwitchProps) {
  const progress = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: isOn ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [isOn, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, MAX_TRANSLATE_X],
  });

  const backgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.darkgrey.main, colors.purple.main],
  });

  return (
    <Pressable
      onPress={handleToggleButton}
      accessibilityRole="switch"
      accessibilityState={{ checked: isOn }}
      hitSlop={6}
    >
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    padding: PADDING,
    borderRadius: 20,
    backgroundColor: colors.darkgrey.main,
  },
  circle: {
    width: CIRCLE_WIDTH,
    height: CIRCLE_WIDTH,
    borderRadius: 999,
    backgroundColor: colors.white,
  },
});
