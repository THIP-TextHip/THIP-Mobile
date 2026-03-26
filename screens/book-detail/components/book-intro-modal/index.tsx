import { BlurView } from "expo-blur";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import { IcX } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface BookIntroModalProps {
  isVisible: boolean;
  description: string;
  handleCloseModal: () => void;
}

export default function BookIntroModal({
  isVisible,
  description,
  handleCloseModal,
}: BookIntroModalProps) {
  const { width, height } = useWindowDimensions();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.centeredView}>
        <BlurView
          intensity={15}
          tint="dark"
          style={styles.backdrop}
          pointerEvents="none"
        />
        <View
          style={[styles.modalSize, { width: width - 40, height: height / 2 }]}
        >
          <ScrollView contentContainerStyle={styles.modalContent}>
            <AppText
              weight="semibold"
              size="base"
              color={colors.white}
              lineHeight={24}
            >
              소개
            </AppText>
            <AppText
              weight="regular"
              size="xs"
              color={colors.grey[100]}
              lineHeight={20}
            >
              {description}
            </AppText>
          </ScrollView>
        </View>
        <Pressable
          style={styles.closeButton}
          onPress={handleCloseModal}
          accessibilityRole="button"
          accessibilityLabel="소개 모달 닫기"
          accessibilityHint="책 소개 모달을 닫습니다"
        >
          <IcX />
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(18, 18, 18, 0.30)",
  },
  modalSize: {
    maxWidth: 350,
    padding: 20,
    paddingRight: 11,
    backgroundColor: colors.darkgrey.main,
    borderRadius: 12,
  },
  modalContent: {
    gap: 12,
    paddingRight: 8,
  },
  closeButton: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(61, 61, 61, 0.5)",
    borderWidth: 2,
    borderColor: colors.grey[300],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
