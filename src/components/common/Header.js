import { useMemo } from "react";
import { styled, makeStyles } from "@mui/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { Logo, Link } from "components/common";
import { ArrowLeftIcon } from "icons";
import { routes } from "routes";
import { find, propEq } from "ramda";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  height: theme.sizes.mobile.appBar.height,
  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Toolbar = styled(MuiToolbar)({
  height: "100%",
  padding: "0 20px",
});

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  textTransform: "capitalize",
  marginLeft: 20,
}));

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    color: theme.palette.common.white,
  },
}));

export default function Header() {
  const classes = useStyles();
  const location = useLocation();

  const pageLabel = useMemo(
    () => find(propEq("path", location?.pathname))(routes)?.key ?? "",
    [location?.pathname]
  );
  const atHome = useMemo(() => "/" === location?.pathname, [location]);
  const general = useMemo(() => !atHome, [atHome]);

  return (
    <AppBar>
      <Toolbar>
        {general && (
          <Link to="/" fitWidth className={classes.link}>
            <ArrowLeftIcon />
            <Title variant="h4">{pageLabel}</Title>
          </Link>
        )}

        {atHome && <Logo />}
      </Toolbar>
    </AppBar>
  );
}
