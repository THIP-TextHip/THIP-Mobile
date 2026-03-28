import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { ReactNode, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@theme/token";

interface CustomBottomSheetProps {
  children: ReactNode;
  isVisible: boolean;
  handleClose: () => void;
  containerPaddingBottom?: number;
}

export default function CustomBottomSheet({
  children,
  isVisible,
  handleClose,
  containerPaddingBottom,
}: CustomBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present();
      return;
    }

    bottomSheetRef.current?.dismiss();
  }, [isVisible]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      onDismiss={handleClose}
      enableDynamicSizing
      enablePanDownToClose
      backdropComponent={(props) => (
        <>
          {/* TODO: 블러가 좀 늦게 사라지는 현상 추후 논의 필요 */}
          <BlurView
            intensity={15}
            tint="dark"
            style={[styles.backdrop, !isVisible && { display: "none" }]}
            pointerEvents="none"
          />
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        </>
      )}
      backgroundStyle={styles.sheetBackground}
      handleComponent={null}
    >
      <BottomSheetView
        style={[
          styles.contentContainer,
          { paddingBottom: containerPaddingBottom ?? 20 + insets.bottom },
        ]}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.darkgrey.main,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(18, 18, 18, 0.30)",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
});
