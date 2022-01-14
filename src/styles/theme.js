import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = {
  palette: {
    primary: {
      light: "#FFD25F",
      main: "#FF9B33",
      dark: "#FF5C01",
    },
    background: {
      default: "#121212",
    },
    // common: {
    //   black: "#121212",
    // },
  },
  typography: {
    fontFamily: ["Ubuntu"].join(","),
    fontStyle: "normal",
    fontSize: 14,
    // lineHeight: "100%",

    h3: {
      fontWeight: "bold",
      fontSize: 48,
      lineHeight: "150%",
      display: "flex",
      alignItems: "center",
    },
    h4: {
      display: "flex",
      alignItems: "center",
      fontSize: 30,
      lineHeight: "150%",
      letterSpacing: 0.25,
    },
    h5: {
      fontWeight: "500",
      fontSize: 24,
      lineHeight: "150%",
      display: "flex",
      alignItems: "center",
      textTransform: "capitalize",
    },
    body2: {
      fontWeight: "300",
      fontSize: 14,
      lineHeight: "150%",
      letterSpacing: 0.25,
    },
  },
};

export default createTheme(theme);
