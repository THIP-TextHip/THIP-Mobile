import { ReactNode } from "react";
import { Dimensions, Modal, StyleSheet, View } from "react-native";

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
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalContainer}>{children}</View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: Dimensions.get("window").width - 40,
    maxWidth: 350,
    padding: 20,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.main,
  },
});
