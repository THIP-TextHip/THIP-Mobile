import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";

import GenreCard from "./components";
import { GENRE_CARD_IMAGE_SIZE, GENRES } from "./constants";

interface GenreCardGroupProps {
  selectedGenre: string | null;
  setSelectedGenre: (v: string | null) => void;
}

const GAP = 16;
const H_PADDING = 20;
const MIN_WIDTH = 130;
const MAX_WIDTH = 180;

export default function GenreCardGroup({
  selectedGenre,
  setSelectedGenre,
}: GenreCardGroupProps) {
  const { width: screenWidth } = useWindowDimensions();

  // 양쪽 패딩 제외한 공간
  const containerWidth = screenWidth - H_PADDING * 2;
  // 들어갈 수 있는 최대 컬럼(3개까지)
  const possibleCols = Math.floor((containerWidth + GAP) / (MIN_WIDTH + GAP));
  const numColumns = Math.min(Math.max(possibleCols, 1), 3);
  // 각 카드의 폭
  const cardWidth = Math.min(
    MAX_WIDTH,
    (containerWidth - GAP * (numColumns - 1)) / numColumns,
  );

  return (
    <FlatList
      key={numColumns}
      contentContainerStyle={styles.genreWrapper}
      data={GENRES}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 && { gap: GAP }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ width: cardWidth }}>
          <GenreCard
            isSelected={item.subTitle === selectedGenre}
            image={
              <item.image
                width={GENRE_CARD_IMAGE_SIZE.width}
                height={GENRE_CARD_IMAGE_SIZE.height}
              />
            }
            title={item.title}
            subTitle={item.subTitle}
            color={item.color}
            setSelectedGenre={setSelectedGenre}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  genreWrapper: {
    width: "100%",
    gap: 16,
  },
});
