import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { IcBye, IcCheckGreen } from "@images/icons";
import { AppText, CustomButton } from "@shared/ui";
import { colors } from "@theme/token";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DeleteAccountCaution, DeleteAccountModal } from "./components";

export default function DeleteAccountScreen() {
  const { bottom } = useSafeAreaInsets();
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePressButton = () => {
    setIsChecked(!isChecked);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <View style={styles.page}>
        <DeleteAccountCaution />
        <View style={styles.agreeSection}>
          <AppText weight="regular" size="sm" color={colors.white}>
            주의사항을 이해하였으며 이에 동의합니다.
          </AppText>
          <Pressable
            style={styles.checkbox}
            onPress={handlePressButton}
            hitSlop={10}
          >
            {isChecked && <IcCheckGreen />}
          </Pressable>
        </View>
        <DeleteAccountModal
          isVisible={isModalVisible}
          handleCloseModal={handleCloseModal}
        />
      </View>
      <CustomButton
        size="full"
        handlePress={handleOpenModal}
        disabled={!isChecked}
        containerStyle={[
          styles.bottomButton,
          bottom !== 0 && { paddingBottom: bottom },
        ]}
      >
        <View style={styles.bottomButtonContent}>
          <IcBye />
          <AppText
            weight="semibold"
            size="lg"
            color={colors.white}
            lineHeight={24}
          >
            Thip 떠나기
          </AppText>
        </View>
      </CustomButton>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
    gap: 30,
  },
  agreeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkbox: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey[200],
  },
  bottomButton: {
    position: "fixed",
    minHeight: 50,
    bottom: 0,
  },
  bottomButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
