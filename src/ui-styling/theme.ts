import { theme, extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  fonts: {
    ...theme.fonts,
    body: "Lexend, sans-serif",
    heading: "Lexend, serif",
  },
  colors: {
    ...theme.colors,
    /** Example */
    // teal: {
    //   ...theme.colors.teal,
    //   700: "#005661",
    //   500: "#00838e",
    //   300: "#4fb3be",
    // },
  },
  components: {
    /** Example */
    // Button: {
    //   baseStyle: {
    //     borderRadius: 24,
    //   },
    // },
  },

  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});
