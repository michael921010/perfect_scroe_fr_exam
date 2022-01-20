import { useMemo } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import Drawer from "./Drawer";
import Profile from "./Profile";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";
import c from "classnames";

const useStyles = makeStyles((theme) => ({
  container: {
    // paddingRight: 0,
    position: "relative",
    [theme.breakpoints.up("xl")]: {
      // paddingRight: theme.sizes.desktop.profile.width,
    },
  },
  body: {
    paddingTop: theme.sizes.mobile.appBar.height,
    maxHeight: "100vh",
    flex: "0 1 auto",
    display: "flex",
    flexFlow: "row nowrap",

    [theme.breakpoints.up("md")]: {
      paddingTop: 0,
    },
  },
  showNavigation: {
    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.sizes.mobile.bottomNavigation.height,
    },
  },
}));

export default function Layout({ children }) {
  const location = useLocation();
  const classes = useStyles();
  const matchXl = useMediaQuery((theme) => theme.breakpoints.up("xl"));

  const showProfile = useMemo(
    () => matchXl && ["/", "/results"].includes(location?.pathname),
    [location, matchXl]
  );

  const needNavigation = useMemo(
    () => ["/"].includes(location?.pathname),
    [location]
  );

  return (
    <Box display="flex" flexDirection="column">
      <Header />

      <Box
        className={c(classes.body, {
          [classes.showNavigation]: needNavigation,
        })}
      >
        <Drawer />
        <Box flexGrow={1} className={c({ [classes.container]: true })}>
          {children}
        </Box>
        {showProfile && <Profile />}
      </Box>

      {needNavigation && <BottomNavigation />}
    </Box>
  );
}
