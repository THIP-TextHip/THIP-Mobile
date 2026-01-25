export const colors = {
  purple: {
    main: "#6868FF",
    sub: "#A1A1FF",
    dark: "#414194",
  },
  neongreen: "#A7FFB4",
  red: "#FF9496",
  kakaoyellow: "#FEE500",

  character: {
    pink: "#FF8BAC",
    mint: "#A0F8E8",
    orange: "#FDB770",
    skyblue: "#A1D5FF",
    lavender: "#C8A5FF",
  },

  white: "#FEFEFE",
  grey: {
    100: "#DADADA",
    200: "#ADADAD",
    300: "#888888",
  },
  darkgrey: {
    main: "#3D3D3D",
    dark: "#282828",
    divider: "#1C1C1C",
  },
  black: {
    main: "#121212",
  },
} as const;

export const typography = {
  fontSize: {
    "2xs": 11,
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 22,
  },

  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
} as const;
