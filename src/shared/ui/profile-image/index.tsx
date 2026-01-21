import { Image, StyleSheet } from "react-native";

import { colors } from "@theme/token";

interface ProfileImageProps {
  image: string;
  size?: number;
}

export default function ProfileImage({ image, size = 36 }: ProfileImageProps) {
  return (
    <Image
      source={{ uri: image }}
      style={[styles.profileImage, { width: size, height: size }]}
    />
  );
}

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: colors.grey[300],
  },
});
