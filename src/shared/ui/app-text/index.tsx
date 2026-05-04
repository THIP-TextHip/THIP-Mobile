import { colors, typography } from "@theme/token";
import { Text, TextProps, TextStyle } from "react-native";

type AppTextProps = TextProps & {
  type?: "default" | "paperlogy";
  weight?: keyof typeof typography.fontWeight;
  size?: keyof typeof typography.fontSize;
  color?: string;
  lineHeight?: number | "normal";
};

const FONT_BY_WEIGHT = {
  regular: "Pretendard_400",
  medium: "Pretendard_500",
  semibold: "Pretendard_600",
  bold: "Pretendard_700",
  extrabold: "Pretendard_800",
} as const;

export default function AppText({
  style,
  type = "default",
  weight = "regular",
  size = "base",
  color = colors.black.main,
  lineHeight = "normal",
  ...props
}: AppTextProps) {
  const fontFamily = type === "paperlogy" ? "Paperlogy_600" : FONT_BY_WEIGHT[weight];

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily,
          fontWeight: "normal",
          fontSize: typography.fontSize[size],
          color,
          ...(lineHeight !== "normal" && { lineHeight }),
        } as TextStyle,
        style,
      ]}
    />
  );
}
