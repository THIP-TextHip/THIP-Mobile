import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface GenreCardProps {
  isSelected: boolean;
  image: ReactNode;
  title: string;
  subTitle: string;
  color: string;
  setSelectedGenre: (genre: string | null) => void;
}

export default function GenreCard({
  isSelected,
  image,
  title,
  subTitle,
  color,
  setSelectedGenre,
}: GenreCardProps) {
  const handleChangeGenre = () => {
    if (isSelected) {
      setSelectedGenre(null);
      return;
    }
    setSelectedGenre(subTitle);
  };
  return (
    <Pressable
      style={[
        styles.cardContainer,
        isSelected && { borderColor: colors.grey[100] },
      ]}
      onPress={handleChangeGenre}
    >
      <View style={[styles.image, isSelected && { opacity: 0.8 }]}>
        {image}
      </View>
      <View style={styles.textWrapper}>
        <AppText
          weight="semibold"
          size="base"
          color={isSelected ? colors.white : colors.grey[200]}
        >
          {title}
        </AppText>
        <AppText weight="regular" size="xs" color={color}>
          {subTitle}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 100,
    width: "100%",
    paddingVertical: 29,
    paddingHorizontal: 20,
    alignItems: "flex-end",

    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.darkgrey.main,
  },
  image: {
    position: "absolute",
    bottom: -1,
    left: 5,
    opacity: 0.2,
  },
  textWrapper: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
