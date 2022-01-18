import { createTheme } from "@mui/material/styles";

const theme = {
  breakpoints: {
    values: {
      xs: 450,
      sm: 600,
      xl: 1440,
    },
  },
  palette: {
    primary: {
      light: "#FFD25F",
      main: "#FF9B33",
      dark: "#FF5C01",
    },
    background: {
      default: "#121212",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.5)",
    },
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
    body1: {
      fontWeight: "normal",
      fontSize: 16,
      lineHeight: "150%",
      letterSpacing: 0.15,
    },
    body2: {
      fontWeight: "300",
      fontSize: 14,
      lineHeight: "150%",
      letterSpacing: 0.25,
      display: "flex",
      alignItems: "center",
    },
  },
  zIndex: {
    appBar: 1201,
  },
  sizes: {
    desktop: {
      menu: {
        width: 80,
      },
      profile: {
        width: 375,
      },
    },
    mobile: {
      appBar: {
        height: 70,
      },
      bottomNavigation: {
        height: 66,
      },
    },
  },
};

export default createTheme(theme);
