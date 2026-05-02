import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { CustomHeader } from "@shared/ui";

export default function JoinGroupHeader() {
  const handleGoBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <LinearGradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      colors={["rgba(18,18,18,1)", "rgba(0,0,0,0)"]}
      style={styles.header}
    >
      <CustomHeader
        left={
          <Pressable
            onPress={handleGoBack}
            accessibilityRole="button"
            accessibilityLabel="뒤로 가기"
            hitSlop={10}
          >
            <IcArrowLeft />
          </Pressable>
        }
        containerStyle={styles.container}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    width: "100%",
  },
  container: {
    backgroundColor: "transparent",
  },
});
