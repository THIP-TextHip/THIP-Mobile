import { BlurView } from "expo-blur";
import { ReactNode } from "react";
import { Dimensions, Modal, Pressable, StyleSheet, View } from "react-native";

import { colors } from "@theme/token";

interface CustomModalProps {
  isVisible: boolean;
  children: ReactNode;
  handleCloseModal: () => void;
}

export default function CustomModal({
  isVisible,
  children,
  handleCloseModal,
}: CustomModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.centeredView}>
        <Pressable style={styles.backdrop} onPress={handleCloseModal} />
        <BlurView
          intensity={15}
          tint="dark"
          style={styles.backdrop}
          pointerEvents="none"
        />
        <View style={styles.modalContainer}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(18, 18, 18, 0.30)",
  },
  modalContainer: {
    width: Dimensions.get("window").width - 40,
    maxWidth: 350,
    padding: 20,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.main,
  },
});
