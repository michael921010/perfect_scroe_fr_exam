import { useMemo } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import Drawer from "./Drawer";
import Profile from "./Profile";
import Header from "./common/Header";
import c from "classnames";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingRight: 0,
    [theme.breakpoints.up("xl")]: {
      paddingRight: theme.sizes.desktop.profile.width,
    },
  },
  body: {
    paddingTop: theme.sizes.mobile.appBar.height,
    maxHeight: "100vh",
    flex: "0 1 auto",
    display: "flex",
    flexFlow: "row nowrap",

    [theme.breakpoints.up("sm")]: {
      paddingTop: 0,
    },
  },
}));

export default function Layout({ children }) {
  const location = useLocation();
  const classes = useStyles();

  const needProfile = useMemo(
    () => ["/", "/results"].includes(location?.pathname),
    [location]
  );

  return (
    <Box display="flex" flexDirection="column">
      <Header />

      <Box className={classes.body}>
        <Drawer />
        <Box flexGrow={1} className={c({ [classes.container]: needProfile })}>
          {children}
        </Box>
        {needProfile && <Profile />}
      </Box>
    </Box>
  );
}
