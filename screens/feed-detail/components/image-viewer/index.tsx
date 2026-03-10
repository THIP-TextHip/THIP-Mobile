import { useCallback, useMemo } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import {
  GestureViewer,
  useGestureViewerState,
} from "react-native-gesture-image-viewer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IcArrowLeft } from "@images/icons";
import { CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

interface ImageViewerProps {
  isVisible: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export default function ImageViewer({
  isVisible,
  images,
  initialIndex = 0,
  onClose,
}: ImageViewerProps) {
  const insets = useSafeAreaInsets();
  const { currentIndex, totalCount } = useGestureViewerState();

  const imageItems = useMemo(
    () => images.map((uri, index) => ({ id: `${index}`, uri })),
    [images],
  );

  const renderItem = useCallback((item: { id: string; uri: string }) => {
    return (
      <Image
        key={item.id}
        source={{ uri: item.uri }}
        style={{ width: "100%", height: "100%", maxHeight: 500 }}
        resizeMode="contain"
      />
    );
  }, []);

  return (
    <Modal
      visible={isVisible}
      backdropColor={colors.black.main}
      onRequestClose={onClose}
    >
      <GestureViewer
        backdropStyle={{ backgroundColor: colors.black.main }}
        data={imageItems}
        initialIndex={initialIndex}
        onDismiss={onClose}
        ListComponent={FlatList}
        renderItem={renderItem}
        renderContainer={(children, { dismiss }) => (
          <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <CustomHeader
              left={
                <Pressable onPress={dismiss}>
                  <IcArrowLeft />
                </Pressable>
              }
              containerStyle={[styles.header, { top: insets.top }]}
            />
            {children}
            <DotsIndicator
              total={totalCount}
              currentIndex={currentIndex}
              bottomInset={insets.bottom}
            />
          </View>
        )}
      />
    </Modal>
  );
}

function DotsIndicator({
  total,
  currentIndex,
  bottomInset,
}: {
  total: number;
  currentIndex: number;
  bottomInset: number;
}) {
  return (
    <View
      pointerEvents="none"
      style={[styles.dotsWrap, { bottom: bottomInset + 20 }]}
    >
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, index === currentIndex && styles.dotActive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black.main,
    paddingBottom: 50,
  },
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "transparent",
  },
  dotsWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.grey[300],
  },
  dotActive: {
    backgroundColor: colors.white,
  },
});
