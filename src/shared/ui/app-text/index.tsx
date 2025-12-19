import { colors, typography } from "@theme/token";
import { Text, TextProps, TextStyle } from "react-native";

type AppTextProps = TextProps & {
  weight?: keyof typeof typography.fontWeight;
  size?: keyof typeof typography.fontSize;
  color?: string;
};

const FONT_BY_WEIGHT = {
  regular: "Pretendard_400",
  medium: "Pretendard_500",
  semibold: "Pretendard_600",
  bold: "Pretendard_700",
  extrabold: "Pretendard_800",
} as const;

export const AppText = ({
  style,
  weight = "regular",
  size = "base",
  color = colors.black.main,
  ...props
}: AppTextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: FONT_BY_WEIGHT[weight],
          fontWeight: "normal",
          fontSize: typography.fontSize[size],
          color,
        } as TextStyle,
        style,
      ]}
    />
  );
};
