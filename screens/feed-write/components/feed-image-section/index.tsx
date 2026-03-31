import * as ImagePicker from "expo-image-picker";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { IcPlus, IcPlusGrey, IcX } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { FEED_IMAGE_MAX } from "../../constants";

interface FeedImageSectionProps {
  imageUrls: string[];
  handleImageUrls: (imageUrls: string[]) => void;
}

export default function FeedImageSection({
  imageUrls,
  handleImageUrls,
}: FeedImageSectionProps) {
  const handlePickImages = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: FEED_IMAGE_MAX - imageUrls.length,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      handleImageUrls([...imageUrls, ...uris]);
    }
  };

  const handleDeleteImage = (targetIndex: number) => {
    const nextImageUrls = imageUrls.filter((_, index) => index !== targetIndex);
    handleImageUrls(nextImageUrls);
  };

  const disabled = imageUrls.length === FEED_IMAGE_MAX;

  return (
    <View style={styles.section}>
      <AppText weight="semibold" size="lg" color={colors.white} lineHeight={24}>
        사진 추가
      </AppText>
      <ScrollView contentContainerStyle={styles.imageWrapper} horizontal>
        <Pressable
          style={[
            styles.addImageButton,
            disabled && { borderColor: colors.darkgrey.main },
          ]}
          disabled={disabled}
          onPress={handlePickImages}
        >
          {disabled ? <IcPlusGrey /> : <IcPlus />}
        </Pressable>
        {imageUrls.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <Pressable
              style={styles.imageDelete}
              onPress={() => handleDeleteImage(index)}
            >
              <IcX />
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <AppText
        weight="regular"
        size="xs"
        color={disabled ? colors.red : colors.neongreen}
        style={styles.count}
      >
        {imageUrls.length} / {FEED_IMAGE_MAX}개
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  imageWrapper: {
    gap: 12,
  },
  addImageButton: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(61, 61, 61, 0.50)",
    borderWidth: 1,
    borderColor: colors.grey[300],
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 80,
    height: 80,
  },
  imageDelete: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(61, 61, 61, 0.50)",
    borderWidth: 1,
    borderColor: colors.grey[300],
  },
  count: {
    textAlign: "right",
  },
});
