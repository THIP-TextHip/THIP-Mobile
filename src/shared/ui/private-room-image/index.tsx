import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, View } from "react-native";

import { IcRoomLock } from "@images/icons";

interface PrivateRoomImageProps {
  image: string;
  width: number;
  height: number;
}

export default function PrivateRoomImage({
  image,
  width,
  height,
}: PrivateRoomImageProps) {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <LinearGradient
        colors={["rgba(18, 18, 18, 0.30)", "rgba(18, 18, 18, 0.30)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.overlay}
      />
      <View style={styles.iconWrapper}>
        <IcRoomLock />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  iconWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
