import { createTheme, MantineColorsTuple } from "@mantine/core";

const BRAND_COLORS: MantineColorsTuple = [
  "#fef6eb",
  "#faebd7",
  "#f7d4a8",
  "#f5bc74",
  "#f3a84a",
  "#f29b31",
  "#f29425",
  "#d7801b",
  "#bf7214",
  "#a66107",
];
export const theme = createTheme({
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
  colors: { primary: BRAND_COLORS },
  primaryColor: "orange",
});
