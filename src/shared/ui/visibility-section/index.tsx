import { StyleSheet, View } from "react-native";

import { colors } from "@theme/token";

import AppText from "../app-text";
import CustomSwitch from "../custom-switch";

interface VisibilitySectionProps {
  isPublic: boolean;
  handleChangeVisibility: (isPublic: boolean) => void;
}

export default function VisibilitySection({
  isPublic,
  handleChangeVisibility,
}: VisibilitySectionProps) {
  const handleToggle = () => {
    handleChangeVisibility(!isPublic);
  };

  const isNotPublic = !isPublic;
  return (
    <View style={styles.section}>
      <AppText weight="semibold" size="lg" color={colors.white} lineHeight={24}>
        공개 설정
      </AppText>
      <View style={styles.content}>
        <AppText
          weight="regular"
          size="sm"
          color={colors.white}
          lineHeight={24}
        >
          비공개로 설정
        </AppText>
        <CustomSwitch isOn={isNotPublic} handleToggleButton={handleToggle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
