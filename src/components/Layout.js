import { useMemo } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import Drawer from "./Drawer";
import Profile from "./Profile";
import c from "classnames";

const useStyles = makeStyles((theme) => ({
  container: {
    "@media (min-width:900px)": {
      // "@media (min-width: 1440px)": {
      paddingRight: theme.sizes.desktop.profile.width,
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
    <Box display="flex" flexDirection="row">
      <Drawer />
      <Box flexGrow={1} className={c({ [classes.container]: needProfile })}>
        {children}
      </Box>
      {needProfile && <Profile />}
    </Box>
  );
}
